import React from 'react';
import {Ticket} from "../../types";
import Button from "../Button/Button";

interface TProps {
    ticket: Ticket;
}

const Ticket: React.FC<TProps> = ({ticket}) => {
    const date = new Date(ticket.departureDate);
    const departureTime = `${date.getHours()}:${date.getMinutes()}`;
    const arrivalTime = `${date.getHours() + ticket.duration}:${date.getMinutes()}`;
    const departureDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

    return (
        <tr key={ticket.id}>
            <td>
                <div>
                    <span>{departureTime}</span>
                    <span>{ticket.departureCity}</span>
                </div>
            </td>
            <td>
                <div>
                    <span>{arrivalTime}</span>
                    <span>{ticket.destinationCity}</span>
                </div>
            </td>
            <td>{ticket.duration + " ч."}</td>
            <td>{departureDate}</td>
            <td>{ticket.price + " руб."}</td>
            <td>
                <Button type="main">Купить</Button>
            </td>
        </tr>
    );
};

export default Ticket;