import React, {useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import './Sidebar.scss';
import Button from "../Button/Button";
import {ReactComponent as SidebarIcon} from "../../assets/icons/sidebar-icon.svg";
import MiniProfile from "../MiniProfile/MiniProfile";

type TProps = {
    isActive: boolean;
    handler: () => void;
}

const Sidebar: React.FC<TProps> = ({isActive, handler}) => {
    const {pathname} = useLocation();

    useEffect(() => {
        if (isActive) {
            handler();
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [pathname])

    return (
        <div className={`sidebar ${isActive ? "show" : ""}`}>
            <div className="sidebar-content">
                <div className="sidebar-head">
                    <Link className='logo' to="/">City<span>Link</span></Link>
                    <Button type="text" onClick={handler}><SidebarIcon/></Button>
                </div>

                <nav className="nav">
                    <Link className={`nav-link ${pathname === '/' ? "active" : ""}`} to='/'>Домашняя страница</Link>
                    <Link className={`nav-link ${pathname === '/routes' ? "active" : ""}`} to='/routes'>Билеты</Link>
                    <Link className={`nav-link ${pathname === '/cities' ? "active" : ""}`} to='/'>Города</Link>
                    <Link className={`nav-link ${pathname === '/buses' ? "active" : ""}`} to='/'>Автобусы</Link>
                    <Link className={`nav-link ${pathname === '/prices' ? "active" : ""}`} to='/'>Цены</Link>
                </nav>

                <MiniProfile/>
            </div>

            <div className="close-area" onClick={handler}/>
        </div>
    );
};

export default Sidebar;