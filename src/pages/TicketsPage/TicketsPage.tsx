import React, {useEffect, useState} from 'react';
import bgShape1 from "../../assets/images/profile-shape1.svg";
import bgShape2 from "../../assets/images/profile-shape2.svg";
import bgShape3 from "../../assets/images/profile-shape3.svg";
import "./TicketsPage.scss"
import {TicketType} from "../../types";
import TicketList from "../../components/TicketList/TicketList";
import {useNavigate} from "react-router-dom";
import TicketService from "../../services/TicketService";
import Loading from "../../components/Loading/Loading";

const TicketsPage = () => {

    const navigate= useNavigate();
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/login")

        TicketService.getTickets()
            .then(result => {
                const {tickets} = result.data;
                setTickets(tickets.reverse());
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
                    <img className="bg-shape" src={bgShape1} alt="bgshape1"/>
                    <img className="bg-shape" src={bgShape2} alt="bgshape2"/>
                    <img className="bg-shape" src={bgShape3} alt="bgshape3"/>

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
                                ? <Loading/>
                                : tickets.length
                                    ? <TicketList tickets={tickets} type="tickets"/>
                                    : <span>У вас нет билетов</span>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketsPage;