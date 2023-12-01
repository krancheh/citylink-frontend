import React from 'react';
import {Link} from "react-router-dom";
import "./Footer.scss"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="wrapper">
                <div className="footer-content">
                    <div className="info">
                        <div className="info-item">
                            <Link className='logo' to="/">City<span>Link</span></Link>
                            <p>CityLink — Ваш надежный путеводитель
                                между городами! Комфорт и
                                безопасность каждого километра. </p>
                        </div>
                        <div className="info-item">
                            <h3>Компания</h3>
                            <div className="info-links">
                                <Link to="/">О нас</Link>
                                <Link to="/">Сотрудники</Link>
                            </div>
                        </div>
                        <div className="info-item">
                            <h3>Ознакомиться</h3>
                            <div className="info-links">
                                <Link to="/">Маршруты</Link>
                                <Link to="/">Автобусы</Link>
                                <Link to="/">Цены</Link>
                            </div>
                        </div>
                        <div className="info-item">
                            <h3>Работа у нас</h3>
                            <div className="info-links">
                                <Link to="/">Вакансии</Link>
                                <Link to="/">Требования</Link>
                            </div>
                        </div>
                        <div className="info-item">
                            <h3>Связаться</h3>
                            <div className="info-links">
                                <Link to="/">support@citylink.ru</Link>
                                <Link to="/">+7 (928) 23 1 - 43 - 24</Link>
                                <Link to="/">г. Ставрополь</Link>
                            </div>
                        </div>
                    </div>
                    <p style={{textAlign: "center"}}>Copyright 2023 • Все права защищены CityLink</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;