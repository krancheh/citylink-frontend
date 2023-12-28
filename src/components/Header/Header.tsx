import React from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Header.scss";
import Button from "../Button/Button";
import {ReactComponent as SidebarIcon} from "../../assets/icons/sidebar-icon.svg";
import MiniProfile from "../MiniProfile/MiniProfile";

type TProps = {
    handler: () => void;
}

const Header: React.FC<TProps> = ({handler}) => {
    const {pathname} = useLocation();

    return (
        <header className='header'>
            <div className="wrapper">
                <div className="header-content">
                    <Button className="menu-button" type="text" onClick={handler}><SidebarIcon/></Button>
                    <Link className='logo' to="/">City<span>Link</span></Link>

                    <nav className="nav">
                        <Link className={`nav-link ${pathname === '/' ? "active" : ""}`} to='/'>Домашняя страница</Link>
                        <Link className={`nav-link ${pathname === '/routes' ? "active" : ""}`} to='/routes'>Билеты</Link>
                        <Link className={`nav-link ${pathname === '/cities' ? "active" : ""}`} to='/'>Города</Link>
                        <Link className={`nav-link ${pathname === '/buses' ? "active" : ""}`} to='/'>Автобусы</Link>
                        <Link className={`nav-link ${pathname === '/prices' ? "active" : ""}`} to='/'>Цены</Link>
                    </nav>

                    <MiniProfile/>
                </div>
            </div>
        </header>
    );
};

export default Header;