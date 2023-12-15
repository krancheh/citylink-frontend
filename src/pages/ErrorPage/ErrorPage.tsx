import React from 'react';
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div style={{minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <h3>Ошибка 404</h3>
            <h1>Страница не найдена</h1>
            <Link to="/">На главную</Link>
        </div>
    );
};

export default ErrorPage;