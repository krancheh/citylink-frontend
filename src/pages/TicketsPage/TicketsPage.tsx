import { useEffect, useState } from 'react';
import bgShape1 from "../../assets/images/profile-shape1.svg";
import bgShape2 from "../../assets/images/profile-shape2.svg";
import bgShape3 from "../../assets/images/profile-shape3.svg";
import "./TicketsPage.scss";
import { TicketType } from "../../types";
import TicketList from "../../components/TicketList/TicketList";
import { useNavigate } from "react-router-dom";
import TicketService from "../../services/TicketService";
import Loading from "../../components/Loading/Loading";
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import dayjs from 'dayjs';

const TicketsPage = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [ticketInfo, setTicketInfo] = useState<TicketType>();

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleOpenModal = (ticket: TicketType) => {
        setTicketInfo(ticket);
        setModalOpen(true);
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/login")

        TicketService.getTickets()
            .then(result => {
                const { tickets } = result.data;
                setTickets(tickets.sort((ticket1, ticket2) => -dayjs(ticket1.purchaseDate).diff(dayjs(ticket2.purchaseDate))));
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    return (
        <div className="profile-page">
            <div className="wrapper">
                <div className="profile-card">
                    {/* bg shapes */}
                    <img className="bg-shape" src={bgShape1} alt="bgshape1" />
                    <img className="bg-shape" src={bgShape2} alt="bgshape2" />
                    <img className="bg-shape" src={bgShape3} alt="bgshape3" />

                    <div className="profile-card__inner">
                        <h3>Личный кабинет</h3>
                        <h1>Мои билеты</h1>

                        <div className="info">
                            <div className="info-item">
                                <h4>Всего билетов:</h4>
                                <span className="info-item-data">{tickets.length}</span>
                            </div>
                        </div>

                        {
                            isLoading
                                ? null
                                : tickets.length
                                    ? <TicketList tickets={tickets} type="tickets" handleOpenModal={handleOpenModal} />
                                    : <span>У вас нет билетов</span>
                        }

                    </div>
                    {
                        isLoading
                            ? <Loading />
                            : null
                    }
                    {
                        modalOpen && ticketInfo &&
                        <Modal title='Информация о билете' onClose={handleCloseModal}>
                            <div className="chosen-ticket">
                                <span>{ticketInfo.departureCity}</span>
                                <span> — </span>
                                <span>{ticketInfo.destinationCity}</span>
                                <p>Дата отправления: <span>{ticketInfo.departureDate}</span></p>
                                <p>Время отправления: <span>{ticketInfo.departureTime}</span></p>
                                <p>Время прибытия: <span>{ticketInfo.arrivalTime}</span></p>
                                <p>Время в пути: <span>{ticketInfo.duration}ч.</span></p>
                                <p>Место: <span>{ticketInfo.seatNo}</span></p>
                            </div>
                            <h3 style={{ textAlign: 'center' }}>QR-код для оплаты билета:</h3>
                            <div className='modal-qrcode'>
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${ticketInfo.paymentCode}&amp;size=200x200`} alt='qr-code' />
                            </div>
                            <p>Предъявите этот QR-код на кассе или оплатите онлайн за <span className='br'>2 часа</span> до отправления. В противном случае билет будет <span className='br'>аннулирован</span>!</p>
                            <div className='modal-buttons'>
                                <Button type='main' onClick={handleCloseModal}>Закрыть</Button>
                            </div>
                        </Modal>
                    }
                </div>
            </div>
        </div>
    );
};

export default TicketsPage;