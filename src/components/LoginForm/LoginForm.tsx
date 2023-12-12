import React, {FormEventHandler, useState} from 'react';
import Input from "../Input/Input";
import {Link} from "react-router-dom";
import Button from "../Button/Button";
import {UserData} from "../../services/AuthService";
import Loading from "../Loading/Loading";

interface TProps {
    auth: (data: UserData) => void;
    error: string;
    isLoading: boolean;
}

const LoginForm: React.FC<TProps> = ({auth, error, isLoading}) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const submitHandler:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const data: UserData = {
            phoneNumber, password
        }
        auth(data);
        console.log(data)
    }

    return (
        <form className="auth-form" onSubmit={submitHandler}>
            {isLoading ? <Loading/> : null}
            <h2>Авторизация</h2>
            <Input id="phoneNumber" value={phoneNumber} setValue={setPhoneNumber} type="tel" autocomplete="tel" label="Номер телефона" required placeholder="+79238273782"/>
            <Input id="password" value={password} setValue={setPassword} type="password" autocomplete="current-password" label="Пароль" required placeholder="•••••••"/>
            <div className="checkbox">
                <input id="remember" type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}/>
                <label htmlFor="remember">Запомнить</label>
            </div>
            {error ? <span className="form-error-message">{error}</span> : null}
            <span style={{margin: "0 0 -20px 0"}}>Ещё нет учетной записи? <Link to="/signup">Зарегистрироваться</Link></span>
            <Button type="main" submit>Отправить</Button>
        </form>
    );
};

export default LoginForm;