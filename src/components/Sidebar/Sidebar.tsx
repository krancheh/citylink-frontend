import React from 'react';
import {Link} from "react-router-dom";
import './Sidebar.scss';
import Button from "../Button/Button";
import {ReactComponent as SidebarIcon} from "../../assets/icons/sidebar-icon.svg";
import MiniProfile from "../MiniProfile/MiniProfile";

type TProps = {
    isActive: boolean;
    handler: () => void;
}

const Sidebar: React.FC<TProps> = ({isActive, handler}) => {

    return (
        <div className={`sidebar ${isActive ? "show" : ""}`}>
            <div className="sidebar-content">
                <div className="sidebar-head">
                    <Link className='logo' to="/">City<span>Link</span></Link>
                    <Button type="text" handler={handler}><SidebarIcon/></Button>
                </div>

                <nav className="nav">
                    <Link className="nav-link" to='/'>Домашняя страница</Link>
                    <Link className="nav-link" to='/'>Билеты</Link>
                    <Link className="nav-link" to='/'>Города</Link>
                    <Link className="nav-link" to='/'>Автобусы</Link>
                    <Link className="nav-link" to='/'>Цены</Link>
                </nav>

                <MiniProfile/>
            </div>

            <div className="close-area" onClick={handler}/>
        </div>
    );
};

export default Sidebar;