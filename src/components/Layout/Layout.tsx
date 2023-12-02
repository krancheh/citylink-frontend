import React, {useState} from 'react';
import Navbar from "../Header/Header";
import './Layout.scss'
import {Outlet} from "react-router-dom";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";


const Layout: React.FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const sidebarHandler = () => {
        setIsActive(!isActive);
    }

    return (
        <div className="layout">
            <Navbar handler={sidebarHandler}/>
            <Sidebar isActive={isActive} handler={sidebarHandler}/>

            <Outlet/>

            <Footer/>
        </div>
    );
};

export default Layout;