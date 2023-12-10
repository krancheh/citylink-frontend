import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Input from "../../components/Input/Input";
import './AuthPage.scss';
import Button from "../../components/Button/Button";
import {ReactComponent as BgShape4} from "../../assets/images/bg-shape4.svg";
import welcomeImage from "../../assets/images/welcome.png"
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";

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
                        ? <LoginForm/>
                        : <SignupForm/>
                    }
                </form>
            </div>
        </div>
    )


};

export default AuthPage;