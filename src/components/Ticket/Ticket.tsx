import React, {memo} from 'react';
import {TicketType} from "../../types";
import Button from "../Button/Button";
import './Ticket.scss';

interface TProps {
    ticket: TicketType;
    type: "tickets" | "routes";
    handleBuyTicket?: (ticket: TicketType) => void;
}

const Ticket: React.FC<TProps> = memo(({ticket, type, handleBuyTicket}) => {
    const date = new Date(ticket.departureDate);
    const departureTime = `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    date.setHours(date.getHours() + ticket.duration);
    const arrivalTime = `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    const departureDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    return (
        <tr className={`ticket ${type === "tickets" ? 'ticket-type' : ""}`}>
            <td className="td-departure">
                {
                    type === "tickets"
                        ? <span className="td-id">{`id: ${ticket.id}`}</span>
                        : null
                }
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
            {type === "tickets"
                ? <td className="td-seat">{ticket.seatNo}</td>
                : null
            }
            {type === "tickets"
                ? null
                : <td className="td-button">
                    <Button type="main" onClick={() => {
                        const chosenTicket: TicketType = {
                            id: ticket.id,
                            departureCity: ticket.departureCity,
                            destinationCity: ticket.destinationCity,
                            departureDate: departureDate,
                            departureTime: departureTime,
                            arrivalTime: arrivalTime,
                            duration: ticket.duration,
                            price: ticket.price
                        }

                        handleBuyTicket?.(chosenTicket);
                    }}>Купить</Button>
                </td>
            }
        </tr>
    );
});

export default Ticket;