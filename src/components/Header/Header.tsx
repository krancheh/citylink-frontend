import React from 'react';
import {Link} from "react-router-dom";
import "./Header.scss";


const Header: React.FC = () => {
    return (
        <header className='header'>
            <div className="wrapper">
                <div className="header-content">
                    <Link className='logo' to="/">City<span>Link</span></Link>

                    <nav className="nav">
                        <Link className="nav-link" to='/'>Домашняя страница</Link>
                        <Link className="nav-link" to='/'>Билеты</Link>
                        <Link className="nav-link" to='/'>Города</Link>
                        <Link className="nav-link" to='/'>Автобусы</Link>
                        <Link className="nav-link" to='/'>Цены</Link>
                    </nav>

                    <div className="mini-profile">
                        <p>Кирилл Махонин</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;