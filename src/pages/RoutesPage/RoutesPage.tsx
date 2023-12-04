import React from 'react';
import './RoutesPage.scss';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {ReactComponent as SwapIcon} from "../../assets/icons/swap-icon.svg";

const RoutesPage = () => {
    return (
        <div className="routes-page">
            <div className="wrapper">
                <form className="search-panel">
                    <h1>Поиск расписаний автобусов</h1>
                    <p>Найти билеты легко и быстро на любой автобусный маршрут на территории юга России</p>
                    <div className="search-inputs">
                        <div className="city-inputs">
                            <div className="city-input">
                                <Input id="departureCity" label="Откуда"/>
                                <p>Например: <Button type="text">Ставрополь</Button></p>
                            </div>

                            <Button type="text" className="swap-button"><SwapIcon/></Button>

                            <div className="city-input">
                                <Input id="destinationCity" label="Куда"/>
                                <p>Например: <Button type="text">Краснодар</Button></p>
                            </div>
                        </div>

                        <div className="date-inputs">
                            <div className="date-input">
                                <Input id="dateFrom" type="date" label="Дата"/>
                                <p><Button type="text">Сегодня</Button>, <Button type="text">Завтра</Button></p>
                            </div>

                            <Button type="main">Найти</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoutesPage;