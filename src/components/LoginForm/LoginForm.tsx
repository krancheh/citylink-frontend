import React, {ChangeEventHandler, FormEventHandler, useEffect, useState} from 'react';
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

    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    useEffect(() => {
        if (phoneNumberError || passwordError) {
            setIsSubmitDisabled(true);
        } else {
            setIsSubmitDisabled(false);
        }
    }, [phoneNumberError, passwordError])

    const handlePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        const inputValue = e.target.value;
        if (!inputValue) {
            return setPasswordError("Поле не может быть пустым");
        }

        if (!/[0-9a-zA-Z!@#]{6,}/g.test(inputValue)) {
            return setPasswordError("Пароль должен состоять минимум из 6 символов");
        }
    }

    const handlePhoneNumberBlur: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (!e.target.value) {
            return setPhoneNumberError("Поле не может быть пустым")
        }

        const inputValue = e.target.value.replace(/\s/g, "");
        if (!/^(\s*)?(\+)?([+]?\d[-()]?){10,14}(\s*)?$/.test(inputValue) || inputValue.replace(/\D/g, "").length !== 11) {
            return setPhoneNumberError("Некорректный формат номера телефона");
        }
    }

    const handlePhoneNumber: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPhoneNumberError("");

        if (/[a-zA-Zа-яА-Я]/.test(e.target.value)) {
            setPhoneNumber("");
            return;
        }
        let inputValue = e.target.value.replace(/\D/g, '');
        if (inputValue.length > 0) {
            if (inputValue.length === 1 && inputValue !== "7") {
                inputValue = "7" + inputValue[0];
            }
            const formattedValue = '+7 (' + inputValue.slice(1, 4) + ') ' +
                inputValue.slice(4, 7) + ' - ' +
                inputValue.slice(7, 9) + ' - ' +
                inputValue.slice(9, 11);

            setPhoneNumber(formattedValue);
        }
    }

    const submitHandler:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const data: UserData = {
            phoneNumber, password
        }
        auth(data);
    }

    return (
        <form className="auth-form" onSubmit={submitHandler}>
            {isLoading ? <Loading/> : null}
            <h2>Авторизация</h2>
            <Input id="phoneNumber" value={phoneNumber} setValue={setPhoneNumber} onChange={handlePhoneNumber} onBlur={handlePhoneNumberBlur} errorMessage={phoneNumberError} type="tel" autocomplete="tel" label="Номер телефона" required placeholder="+79238273782"/>
            <Input id="password" value={password} setValue={setPassword} onBlur={handlePassword} errorMessage={passwordError} type="password" autocomplete="current-password" label="Пароль" required placeholder="•••••••"/>
            <div className="checkbox">
                <input id="remember" type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}/>
                <label htmlFor="remember">Запомнить</label>
            </div>
            {error ? <span className="form-error-message">{error}</span> : null}
            <span style={{margin: "0 0 -20px 0"}}>Ещё нет учетной записи? <Link to="/signup">Зарегистрироваться</Link></span>
            <Button type="main" submit disabled={isSubmitDisabled}>Отправить</Button>
        </form>
    );
};

export default LoginForm;