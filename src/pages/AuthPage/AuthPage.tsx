import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Input from "../../components/Input/Input";
import './AuthPage.scss';
import Button from "../../components/Button/Button";
import {ReactComponent as BgShape4} from "../../assets/images/bg-shape4.svg";
import welcomeImage from "../../assets/images/welcome.png"

type InputValueType = {
    target: {
        value: string;
        valueAsNumber?: number;
    }
}

const AuthPage = () => {
    const {pathname} = useLocation();
    const [nameError, setNameError] = useState<string>("");

    const firstnameInputHandler = (e: InputValueType) => {
        const name = e.target.value;

        if (name.length < 3) setNameError("Введите имя")
        else setNameError("")
    }


    return (
        <div className="auth-page">
            <div className="auth-content">
                <div className="left-side">
                    <h1>Добро пожаловать!</h1>
                    <BgShape4/>
                    <img src={welcomeImage} alt="Hi"/>
                </div>
                <form className="auth-form">
                    {pathname === "/login"
                        ? <>
                            <h1>Авторизация</h1>
                            <Input id="phoneNumber" type="tel" autocomplete="tel" label="Номер телефона" required placeholder="+79238273782"/>
                            <Input id="password" type="password" autocomplete="current-password" label="Пароль" required placeholder="•••••••"/>
                            <div className="checkbox">
                                <input id="remember" type="checkbox"/>
                                <label htmlFor="remember">Запомнить</label>
                            </div>
                            <span style={{margin: "0 0 -20px 0"}}>Ещё нет учетной записи? <Link to="/signup">Зарегистрироваться</Link></span>
                            <Button type="main">Отправить</Button>
                        </>
                        : <>
                            <h1>Регистрация</h1>
                            <div className="name-inputs">
                                <Input id="firstName" autocomplete="given-name" required label="Имя" errorMessage={nameError} onBlur={firstnameInputHandler} placeholder="Вася"/>
                                <Input id="lastName" autocomplete="family-name" required label="Фамилия" placeholder="Пупкин"/>
                            </div>
                            <Input id="phoneNumber" type="tel" autocomplete="tel" label="Номер телефона" required placeholder="+79238273782"/>
                            <Input id="password" type="password" autocomplete="new-password" label="Пароль" required placeholder="•••••••"/>
                            <Input id="retypePassword" type="password" autocomplete="new-password" label="Повторите пароль" required placeholder="•••••••"/>
                            <span style={{margin: "0 0 -20px 0"}}>Уже есть учетная запись? <Link to="/login">Войти</Link></span>
                            <Button type="main">Отправить</Button>
                        </>
                    }
                </form>
            </div>
        </div>
    )


};

export default AuthPage;