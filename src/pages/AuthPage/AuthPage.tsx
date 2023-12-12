import React, {useState} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import './AuthPage.scss';
import {ReactComponent as BgShape4} from "../../assets/images/bg-shape4.svg";
import welcomeImage from "../../assets/images/welcome.png"
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import AuthService, {UserData} from "../../services/AuthService";
import {useAppDispatch} from "../../store";
import {setUser} from "../../store/userSlice";

interface AuthFC {
    [key: string]: typeof AuthService.login;
}

const AuthPage = () => {
    const {pathname} = useLocation();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(!!localStorage.getItem("token"))

    const dispatch = useAppDispatch();

    const auth: AuthFC = {
        "/login": (data) => AuthService.login(data),
        "/signup":  (data) => AuthService.signup(data)
    }

    const makeRequest = async (data: UserData) => {
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
                    <h1>Добро пожаловать!</h1>
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