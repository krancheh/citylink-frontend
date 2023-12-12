import React, {FormEventHandler, useEffect, useRef, useState} from 'react';
import './RoutesPage.scss';
import SearchForm from "../../components/SearchForm/SearchForm";
import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import {TicketType} from "../../types";
import TicketList from "../../components/TicketList/TicketList";
import routeCount from "../../utils/routeCount";
import TicketService from "../../services/TicketService";



const RoutesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams({});

    const [departureCity, setDepartureCity] = useState(searchParams.get("departureCity") || "");
    const [destinationCity, setDestinationCity] = useState(searchParams.get("destinationCity") || "");
    const [departureDate, setDepartureDate] = useState(searchParams.get("departureDate") || "");

    const [tickets, setTickets] = useState<TicketType[]>([]);

    const [searchPerformed, setSearchPerformed] = useState(false);
    const [paddingTop, setPaddingTop] = useState("");

    const searchFormRef = useRef<HTMLDivElement>(null);


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
                                <TicketList tickets={tickets}/>
                            </div>
                        :
                            null
                    }
                </div>
            </div>
        </div>
    );
};

export default RoutesPage;