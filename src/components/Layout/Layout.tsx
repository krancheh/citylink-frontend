import React from 'react';
import Navbar from "../Header/Header";
import './Layout.scss'
import {Outlet} from "react-router-dom";
import Footer from "../Footer/Footer";


const Layout: React.FC = () => {
    return (
        <div className="layout">
            <Navbar/>

                <Outlet/>

            <Footer/>
        </div>
    );
};

export default Layout;