import React, {useState} from 'react';
import "./MiniProfile.scss";
import Button from "../Button/Button";
import {selectIsLoading, selectUser, setUser} from "../../store/userSlice";
import {ReactComponent as CaretDown} from "../../assets/icons/caret-down-icon.svg";
import {useAppDispatch, useAppSelector} from "../../store";
import Loading from "../Loading/Loading";
import {Link} from "react-router-dom";

const MiniProfile: React.FC = () => {

    const name: string = useAppSelector(selectUser);
    const isLoading: boolean = useAppSelector(selectIsLoading)
    const dispatch = useAppDispatch();

    return (
        <div className={`mini-profile ${name ? "user" : ""}`}>

            {!isLoading
                ? name
                    ? <>
                        <span>{name}</span>
                        <CaretDown/>
                    </>
                    : <>
                        <Button type="text" path="/login">Войти</Button>
                        <Button type="main" path="/signup">Регистрация</Button>
                    </>
                : <p>Loading..</p>
            }

            <div className={`mini-menu`}>
                <Link to="/profile">Личный кабинет</Link>
                <Link to="/tickets">Билеты</Link>
                <Button type="text" onClick={() => {
                    dispatch(setUser(""));
                    localStorage.clear();
                }}>
                    Выйти
                </Button>
            </div>
        </div>
    );
};

export default MiniProfile;