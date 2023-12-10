import React from 'react';
import {TicketType} from "../../types";
import Button from "../Button/Button";
import './Ticket.scss';

interface TProps {
    ticket: TicketType;
}

const Ticket: React.FC<TProps> = ({ticket}) => {
    const date = new Date(ticket.departureDate);
    const departureTime = `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    date.setHours(date.getHours() + ticket.duration);
    const arrivalTime = `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    const departureDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    return (
        <tr className="ticket">
            <td className="td-departure">
                <h4>{departureTime}</h4>
                <div>{ticket.departureCity}</div>
            </td>
            <td className="td-destination">
                <h4>{arrivalTime}</h4>
                <div>{ticket.destinationCity}</div>
            </td>
            <td className="td-duration">{ticket.duration + " ч."}</td>
            <td className="td-date">{departureDate}</td>
            <td className="td-price">{ticket.price + " руб."}</td>
            <td className="td-button">
                <Button type="main">Купить</Button>
            </td>
        </tr>
    );
};

export default Ticket;