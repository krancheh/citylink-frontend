import React, { memo } from 'react';
import { TicketType } from "../../types";
import Button from "../Button/Button";
import './Ticket.scss';
import dayjs from 'dayjs';

interface TProps {
    ticket: TicketType;
    type: "tickets" | "routes";
    handleBuyTicket?: (ticket: TicketType) => void;
    handleOpenModal?: (ticket: TicketType) => void;
}

const Ticket: React.FC<TProps> = memo(({ ticket, type, handleBuyTicket, handleOpenModal }) => {
    const date = dayjs(ticket.departureDate);

    const formattedTicket: TicketType = {
        ...ticket,
        departureTime: date.format('HH:mm'),
        departureDate: dayjs(date).format('DD.MM.YYYY'),
        arrivalTime: date.add(ticket.duration, 'hours').format('HH:mm')
    }

    return (
        <tr className={`ticket ${type === "tickets" ? 'ticket-type' : ""}`} onClick={handleOpenModal ? () => handleOpenModal(formattedTicket) : undefined}>
            <td className="td-departure">
                {
                    type === "tickets"
                        ? <span className="td-id">{`id: ${ticket.id}`}</span>
                        : null
                }
                <h4>{formattedTicket.departureTime}</h4>
                <div>{ticket.departureCity}</div>
            </td>
            <td className="td-destination">
                <h4>{formattedTicket.arrivalTime}</h4>
                <div>{ticket.destinationCity}</div>
            </td>
            <td className="td-duration">{ticket.duration + " ч."}</td>
            <td className="td-date">{formattedTicket.departureDate}</td>
            <td className="td-price">{ticket.price + " руб."}</td>
            {type === "tickets"
                ? <td className="td-seat">{ticket.seatNo}</td>
                : null
            }
            {type === "tickets"
                ? null
                : <td className="td-button">
                    <Button type="main" onClick={() => {
                        handleBuyTicket?.(formattedTicket);
                    }}>Забронировать</Button>
                </td>
            }
        </tr>
    );
});

export default Ticket;