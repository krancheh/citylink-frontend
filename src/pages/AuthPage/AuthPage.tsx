import React, {useState} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import './AuthPage.scss';
import {ReactComponent as BgShape4} from "../../assets/images/bg-shape4.svg";
import welcomeImage from "../../assets/images/welcome.png"
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import AuthService, {UserData} from "../../services/AuthService";

interface AuthFC {
    [key: string]: typeof AuthService.login;
}

const AuthPage = () => {
    const {pathname} = useLocation();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(!!localStorage.getItem("token"));

    const auth: AuthFC = {
        "/login": (data) => AuthService.login(data),
        "/signup":  (data) => AuthService.signup(data)
    }

    const makeRequest = async (data: UserData) => {
        data.phoneNumber = data.phoneNumber.replace(/\D/g, "");
        setIsLoading(true);
        auth[pathname](data)
            .then((result) => {
                const { token } = result.data;
                localStorage.setItem("token", token);
                setIsSuccess(true);
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
            })
            .finally(() => setIsLoading(false));
    }

    if (isSuccess) return <Navigate to={'/'}/>

    return (
        <div className="auth-page">
            <div className="auth-content">
                <div className="left-side">
                    <h2>Добро пожаловать!</h2>
                    <BgShape4/>
                    <img src={welcomeImage} alt="Hi"/>
                </div>
                {pathname === "/login"
                    ? <LoginForm auth={makeRequest} error={errorMessage} isLoading={isLoading}/>
                    : <SignupForm auth={makeRequest} error={errorMessage} isLoading={isLoading}/>
                }
            </div>
        </div>
    )


};

export default AuthPage;