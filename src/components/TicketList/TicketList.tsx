import React from 'react';
import './TicketList.scss';
import Ticket from '../Ticket/Ticket';
import {TicketType} from '../../types';

interface TProps {
    tickets: TicketType[];
    type: "tickets" | "routes";
}

const TicketList: React.FC<TProps> = ({tickets, type}) => {
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
                                return <Ticket key={ticket.id} ticket={ticket} type={type}></Ticket>
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