import React, {FormEventHandler, useEffect, useRef, useState} from 'react';
import './RoutesPage.scss';
import SearchForm from "../../components/SearchForm/SearchForm";
import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import {TicketType} from "../../types";
import TicketList from "../../components/TicketList/TicketList";
import routeCount from "../../utils/routeCount";
import TicketService from "../../services/TicketService";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AuthService from "../../services/AuthService";
import Loading from "../../components/Loading/Loading";
import SuccessIcon from "../../assets/icons/success-icon.svg";



const RoutesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams({});

    const [departureCity, setDepartureCity] = useState(searchParams.get("departureCity") || "");
    const [destinationCity, setDestinationCity] = useState(searchParams.get("destinationCity") || "");
    const [departureDate, setDepartureDate] = useState(searchParams.get("departureDate") || "");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passportSerial, setPassportSerial] = useState("");
    const [passportNumber, setPassportNumber] = useState("");

    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [chosenTicket, setChosenTicket] = useState<TicketType | null>(null);

    const [searchPerformed, setSearchPerformed] = useState(false);
    const [paddingTop, setPaddingTop] = useState("");

    const searchFormRef = useRef<HTMLDivElement>(null);

    const [isDocModalActive, setIsDocModalActive] = useState(false);
    const [isBuyModalActive, setIsBuyModalActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (departureCity && destinationCity && departureDate) {
            const data = {
                departureCity,
                destinationCity,
                departureDate: new Date(departureDate).getTime().toString()
            }

            TicketService.getRoutes(data)
                .then(result => {
                    setTickets(result.data.routes)
                })
                .catch(e => console.log(e.message))

            setSearchPerformed(true);
        }

        const handleResize = () => {
            const searchForm = searchFormRef.current;
            if (searchForm) {
                const formHeight = searchForm.getBoundingClientRect().height;
                setPaddingTop(`max(calc(50vh - ${formHeight / 2}px), 100px)`)
            }
        }
        handleResize();

        window.addEventListener('resize', () => {
            handleResize()
        });

        return window.removeEventListener('resize', () => {
            handleResize();
        });
    }, []);



    const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const searchParams: URLSearchParamsInit = {
            departureCity: formData.get("departureCity") as string,
            destinationCity: formData.get("destinationCity") as string,
            departureDate: formData.get("departureDate") as string,
        };

        setSearchParams(searchParams);

        const data = {
            departureCity: searchParams.departureCity.toString().toLowerCase(),
            destinationCity: searchParams.destinationCity.toString().toLowerCase(),
            departureDate: new Date(formData.get("departureDate") as string).getTime().toString(),
        }

        TicketService.getRoutes(data)
            .then(result => {
                setTickets(result.data.routes)
            })
            .catch(e => console.log(e.message))

        setSearchPerformed(true);
    }


    const handleBuyTicket = async (ticket: TicketType) => {
        try {
            const {data} = await AuthService.getUser();
            const {user} = data;
            setChosenTicket(ticket);

            if (!user.documentNumber) {
                setFirstName(user.firstName || "");
                setLastName(user.lastName || "");
                setIsDocModalActive(true);
                return;
            }

            setIsBuyModalActive(true);
        } catch (e) {
            console.log(e);
        }
    }

    const submitDocHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formData = {
            firstName,
            lastName,
            documentNumber: +(passportSerial + passportNumber)
        }

        setIsLoading(true);
        AuthService.update(formData)
            .then(() => {
                setIsDocModalActive(false);
                setIsBuyModalActive(true);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const buyTicket: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!chosenTicket) return;

        setIsLoading(true);
        TicketService.addTicket(chosenTicket.id)
            .then(({data}) => {
                console.log(data);
                setTimeout(() => {
                    setIsBuyModalActive(false);
                    setIsSuccess(false);
                }, 3000);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
                setIsSuccess(true);
            })
    }

    const closeModalHandler = () => {
        setIsBuyModalActive(false);
        setIsDocModalActive(false);
        setChosenTicket(null);
    }

    return (
        <div className="routes-page">
            <div className="wrapper">
                <div className="routes-page__inner" style={{paddingTop: `${searchPerformed ? "100px" : paddingTop}`}}>
                    <SearchForm
                        searchFormRef={searchFormRef}
                        searchPerformed={searchPerformed}
                        departureCityState={{departureCity, setDepartureCity}}
                        destinationCityState={{destinationCity, setDestinationCity}}
                        departureDateState={{departureDate, setDepartureDate}}
                        handleSearch={handleSearch}
                    />
                    {
                        searchPerformed
                        ?
                            <div className="found-panel">
                                <h3>Расписание автобусов</h3>
                                <h1>{`${searchParams.get("departureCity")} — ${searchParams.get("destinationCity")}`}</h1>
                                <h3 className="routes-count">{tickets.length ? `Найдено: ${tickets.length} ${routeCount(tickets.length)}` : "Рейсы на эту дату не найдены"}</h3>
                                <TicketList tickets={tickets} type="routes" handleBuyTicket={handleBuyTicket}/>
                            </div>
                        :
                            null
                    }
                </div>
            </div>
            {
                isDocModalActive
                    ? <Modal title="Покупка билета" onClose={closeModalHandler}>
                        <form className="passport-info-form" onSubmit={submitDocHandler}>
                            <p>Для продолжения укажите личные данные:</p>
                            <Input id="firstName" value={firstName} setValue={setFirstName} label="Имя"/>
                            <Input id="lastName" value={lastName} setValue={setLastName} label="Фамилия"/>
                            <p>Паспортные данные:</p>
                            <Input id="passSerial" value={passportSerial} setValue={setPassportSerial} label="Серия"/>
                            <Input id="passNumber" value={passportNumber} setValue={setPassportNumber} label="Номер"/>
                            <div className="modal-buttons">
                                <Button type="main" submit>Принять</Button>
                                <Button onClick={closeModalHandler}>Отмена</Button>
                            </div>
                        </form>

                        {isLoading
                            ? <Loading/>
                            : null
                        }
                    </Modal>
                    : null
            }
            {
                isBuyModalActive && chosenTicket
                    ? <Modal title={isSuccess ? "Успешно" : "Покупка билета"} onClose={closeModalHandler}>
                        {
                            isSuccess
                                ? <div className="success-message">
                                    <img src={SuccessIcon} alt="Успешно"/>
                                    <p>Подробную информацию
                                        о купленном билете вы сможете найти
                                        в личном кабинете
                                    </p>
                                    <Button type="main" path="/tickets">В личный кабинет</Button>
                                </div>
                                : <form className="buy-ticket-form" onSubmit={buyTicket}>
                                    <p>Подтвердите покупку:</p>
                                    <div className="chosen-ticket">
                                        <span>{chosenTicket.departureCity}</span>
                                        <span> — </span>
                                        <span>{chosenTicket.destinationCity}</span>
                                        <p>Дата отправления: <span>{chosenTicket.departureDate}</span></p>
                                        <p>Время отправления: <span>{chosenTicket.departureTime}</span></p>
                                        <p>Время прибытия: <span>{chosenTicket.arrivalTime}</span></p>
                                        <p>Время в пути: <span>{chosenTicket.duration}ч.</span></p>
                                    </div>
                                    <p>К оплате</p>
                                    <span className="chosen-ticket-price">1400 руб.</span>

                                    <div className="modal-buttons">
                                        <Button type="main" submit>Оплатить</Button>
                                        <Button onClick={closeModalHandler}>Отмена</Button>
                                    </div>
                                </form>
                        }

                        {isLoading
                            ? <Loading/>
                            : null
                        }
                    </Modal>
                    : null
            }
        </div>
    );
};

export default RoutesPage;