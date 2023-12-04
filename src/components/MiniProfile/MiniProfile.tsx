import React from 'react';
import "./MiniProfile.scss";
import Button from "../Button/Button";

const MiniProfile = () => {
    return (
        <div className="mini-profile">
            <Button type="text" path="/login">Войти</Button>
            <Button type="main" path="/signup">Регистрация</Button>
        </div>
    );
};

export default MiniProfile;