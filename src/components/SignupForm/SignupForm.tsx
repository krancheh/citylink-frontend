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

const SignupForm: React.FC<TProps> = ({auth, error, isLoading}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");


    const submitHandler:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const data: UserData = {
            firstName, lastName, phoneNumber: phoneNumber, password
        }
        auth(data);
        console.log(data)
    }

    return (
        <form className="auth-form" onSubmit={event => submitHandler(event)}>
            {isLoading ? <Loading/> : null}
            <h2>Регистрация</h2>
            <div className="name-inputs">
                <Input id="firstName" value={firstName} setValue={setFirstName} autocomplete="given-name" required label="Имя" placeholder="Вася"/>
                <Input id="lastName" value={lastName} setValue={setLastName} autocomplete="family-name" required label="Фамилия" placeholder="Пупкин"/>
            </div>
            <Input id="phoneNumber" value={phoneNumber} setValue={setPhoneNumber} type="tel" autocomplete="tel" label="Номер телефона" required placeholder="+79238273782"/>
            <Input id="password" value={password} setValue={setPassword} type="password" autocomplete="new-password" label="Пароль" required placeholder="•••••••"/>
            <Input id="retypePassword" value={retypedPassword} setValue={setRetypedPassword} type="password" autocomplete="new-password" label="Повторите пароль" required placeholder="•••••••"/>
            {error ? <span className="form-error-message">{error}</span> : null}
            <span style={{margin: "0 0 -20px 0"}}>Уже есть учетная запись? <Link to="/login">Войти</Link></span>
            <Button type="main" submit>Отправить</Button>
        </form>
    );
};

export default SignupForm;