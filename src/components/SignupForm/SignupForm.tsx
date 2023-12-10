import React, {useState} from 'react';
import Input from "../Input/Input";
import {Link} from "react-router-dom";
import Button from "../Button/Button";

const SignupForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");

    return (
        <>
            <h1>Регистрация</h1>
            <div className="name-inputs">
                <Input id="firstName" value={firstName} setValue={setFirstName} autocomplete="given-name" required label="Имя" placeholder="Вася"/>
                <Input id="lastName" value={lastName} setValue={setLastName} autocomplete="family-name" required label="Фамилия" placeholder="Пупкин"/>
            </div>
            <Input id="phoneNumber" value={phoneNumber} setValue={setPhoneNumber} type="tel" autocomplete="tel" label="Номер телефона" required placeholder="+79238273782"/>
            <Input id="password" value={password} setValue={setPassword} type="password" autocomplete="new-password" label="Пароль" required placeholder="•••••••"/>
            <Input id="retypePassword" value={retypedPassword} setValue={setRetypedPassword} type="password" autocomplete="new-password" label="Повторите пароль" required placeholder="•••••••"/>
            <span style={{margin: "0 0 -20px 0"}}>Уже есть учетная запись? <Link to="/login">Войти</Link></span>
            <Button type="main">Отправить</Button>
        </>
    );
};

export default SignupForm;