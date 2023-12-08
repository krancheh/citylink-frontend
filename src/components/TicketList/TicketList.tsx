import React from 'react';
import './TicketList.scss';
import Ticket from '../Ticket/Ticket';

interface TProps {
    tickets: Ticket[];
}

const TicketList: React.FC<TProps> = ({tickets}) => {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Отправление</th>
                    <th>Прибытие</th>
                    <th>Время в пути</th>
                    <th>Дата</th>
                    <th>Цена</th>
                </tr>
                </thead>
                <tbody>
                {tickets.map(ticket => {
                    return (
                        <Ticket ticket={ticket}></Ticket>
                    )
                })}
                </tbody>
            </table>

        </div>
    );
};

export default TicketList;