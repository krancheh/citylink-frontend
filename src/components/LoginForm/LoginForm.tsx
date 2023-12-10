import React, {ChangeEventHandler, useState} from 'react';
import Input from "../Input/Input";
import {Link} from "react-router-dom";
import Button from "../Button/Button";

const LoginForm = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const rememberHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setRemember(e.target.checked);
    }

    return (
        <>
            <h1>Авторизация</h1>
            <Input id="phoneNumber" value={phoneNumber} setValue={setPhoneNumber} type="tel" autocomplete="tel" label="Номер телефона" required placeholder="+79238273782"/>
            <Input id="password" value={password} setValue={setPassword} type="password" autocomplete="current-password" label="Пароль" required placeholder="•••••••"/>
            <div className="checkbox">
                <input id="remember" type="checkbox" checked={remember} onChange={rememberHandler}/>
                <label htmlFor="remember">Запомнить</label>
            </div>
            <span style={{margin: "0 0 -20px 0"}}>Ещё нет учетной записи? <Link to="/signup">Зарегистрироваться</Link></span>
            <Button type="main">Отправить</Button>
        </>
    );
};

export default LoginForm;