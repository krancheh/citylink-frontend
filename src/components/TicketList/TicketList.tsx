import React, { useState } from 'react';
import './TicketList.scss';
import Ticket from '../Ticket/Ticket';
import { TicketType } from '../../types';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

interface TProps {
    tickets: TicketType[];
    type: "tickets" | "routes";
    handleBuyTicket?: (ticket: TicketType) => void;
    handleOpenModal?: (ticket: TicketType) => void;
}

const TicketList: React.FC<TProps> = ({ tickets, type, handleBuyTicket, handleOpenModal }) => {

    return (
        <div className="ticket-list">
            <table className="ticket-table">
                {tickets.length
                    ? <>
                        <thead>
                            <tr>
                                <th>Отправление</th>
                                <th>Прибытие</th>
                                <th>Время в пути</th>
                                <th>Дата</th>
                                <th>Стоимость</th>
                                {type === "tickets"
                                    ? <th>Место</th>
                                    : null
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets.map(ticket => {
                                    return <Ticket key={ticket.id} ticket={ticket} type={type} handleBuyTicket={handleBuyTicket} handleOpenModal={handleOpenModal}></Ticket>
                                })
                            }
                        </tbody>
                    </>
                    : null
                }
            </table>

        </div>
    );
};

export default TicketList;