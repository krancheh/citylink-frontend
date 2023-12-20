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

const SignupForm: React.FC<TProps> = ({auth, error, isLoading}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [retypePwdError, setRetypePwdError] = useState("");

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    useEffect(() => {
        if (firstNameError || lastNameError || phoneNumberError || passwordError || retypePwdError) {
            setIsSubmitDisabled(true);
        } else {
            setIsSubmitDisabled(false);
        }
    }, [firstNameError, lastNameError, phoneNumberError, passwordError, retypePwdError])

    const handleFirstName: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (/^[a-zA-Zа-яА-Я]+$/.test(e.target.value)) {
            setFirstNameError("");
        } else {
            if (!e.target.value) {
                return setFirstNameError("Поле не может быть пустым");
            }
            setFirstNameError("Имя содержит недопустимые символы")
        }
    }

    const handleLastName: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (/^[a-zA-Zа-яА-Я]+$/.test(e.target.value)) {
            setLastNameError("");
        } else {
            if (!e.target.value) {
                return setLastNameError("Поле не может быть пустым");
            }
            setLastNameError("Фамилия содержит недопустимые символы")
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

    const handlePhoneNumberBlur: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (!e.target.value) {
            return setPhoneNumberError("Поле не может быть пустым")
        }

        const inputValue = e.target.value.replace(/\s/g, "");
        if (!/^(\s*)?(\+)?([+]?\d[-()]?){10,14}(\s*)?$/.test(inputValue) || inputValue.replace(/\D/g, "").length !== 11) {
            return setPhoneNumberError("Некорректный формат номера телефона");
        }
    }

    const handlePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        const inputValue = e.target.value;
        if (!inputValue) {
            return setPasswordError("Поле не может быть пустым");
        }

        if (!/[0-9a-zA-Z!@#]{6,}/g.test(inputValue)) {
            return setPasswordError("Пароль должен состоять минимум из 6 символов");
        }
    }

    const handleRetypePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        const inputValue = e.target.value;
        if (!inputValue) {
            return setRetypePwdError("Поле не может быть пустым");
        }

        if (inputValue !== password) {
            return setRetypePwdError("Пароли не совпадают");
        }
    }

    const submitHandler:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const data: UserData = {
            firstName, lastName, phoneNumber, password
        }
        auth(data);
    }

    return (
        <form className="auth-form" onSubmit={event => submitHandler(event)}>
            {isLoading ? <Loading/> : null}
            <h2>Регистрация</h2>
            <div className="name-inputs">
                <Input id="firstName" value={firstName} setValue={setFirstName} onChange={() => setFirstNameError("")} onBlur={handleFirstName} autocomplete="given-name" type="text" required label="Имя" placeholder="Вася" errorMessage={firstNameError}/>
                <Input id="lastName" value={lastName} setValue={setLastName} onChange={() => setLastNameError("")} onBlur={handleLastName} autocomplete="family-name" required label="Фамилия" placeholder="Пупкин" errorMessage={lastNameError}/>
            </div>
            <Input id="phoneNumber" value={phoneNumber} setValue={setPhoneNumber} onChange={handlePhoneNumber} onBlur={handlePhoneNumberBlur} type="tel" autocomplete="tel" label="Номер телефона" required placeholder="+79238273782" errorMessage={phoneNumberError}/>
            <Input id="password" value={password} setValue={setPassword} onChange={() => setPasswordError("")} onBlur={handlePassword} type="password" autocomplete="new-password" label="Пароль" required placeholder="•••••••" errorMessage={passwordError}/>
            <Input id="retypePassword" value={retypedPassword} setValue={setRetypedPassword} onChange={() => setRetypePwdError("")} onBlur={handleRetypePassword} type="password" autocomplete="new-password" label="Повторите пароль" required placeholder="•••••••" errorMessage={retypePwdError}/>
            {error ? <span className="form-error-message">{error}</span> : null}
            <span style={{margin: "0 0 -20px 0"}}>Уже есть учетная запись? <Link to="/login">Войти</Link></span>
            <Button type="main" submit disabled={isSubmitDisabled}>Отправить</Button>
        </form>
    );
};

export default SignupForm;