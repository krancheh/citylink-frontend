import React from 'react';
import {Link} from "react-router-dom";
import "./Header.scss";
import Button from "../Button/Button";
import {ReactComponent as SidebarIcon} from "../../assets/icons/sidebar-icon.svg";
import MiniProfile from "../MiniProfile/MiniProfile";

type TProps = {
    handler: () => void;
}

const Header: React.FC<TProps> = ({handler}) => {
    return (
        <header className='header'>
            <div className="wrapper">
                <div className="header-content">
                    <Button className="menu-button" type="text" handler={handler}><SidebarIcon/></Button>
                    <Link className='logo' to="/">City<span>Link</span></Link>

                    <nav className="nav">
                        <Link className="nav-link" to='/'>Домашняя страница</Link>
                        <Link className="nav-link" to='/routes'>Билеты</Link>
                        <Link className="nav-link" to='/'>Города</Link>
                        <Link className="nav-link" to='/'>Автобусы</Link>
                        <Link className="nav-link" to='/'>Цены</Link>
                    </nav>

                    <MiniProfile/>
                </div>
            </div>
        </header>
    );
};

export default Header;