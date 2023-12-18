import React, {useEffect, useState} from 'react';
import userIcon from "../../assets/icons/user-icon.png";
import Button from "../../components/Button/Button";
import "./ProfilePage.scss";
import bgShape1 from "../../assets/images/profile-shape1.svg";
import bgShape2 from "../../assets/images/profile-shape2.svg";
import bgShape3 from "../../assets/images/profile-shape3.svg";
import {useAppDispatch, useAppSelector} from "../../store";
import {selectUser, setUser} from "../../store/userSlice";
import AuthService from "../../services/AuthService";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import {User} from "../../types";

const ProfilePage = () => {

    const dispatch = useAppDispatch();
    const name = useAppSelector(selectUser);
    const [userInfo, setUserInfo] = useState<User>();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/login")
        setIsLoading(true);
        AuthService.getUser()
            .then(result => {
                setUserInfo(result.data.user);
            })
            .catch(e => {
                console.log(e);
                navigate("/login");
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <div className="profile-page">
            <div className="wrapper">
                <div className="profile-card">
                    {/* bg shapes */}
                    <img className="bg-shape" src={bgShape1} alt="bgshape1"/>
                    <img className="bg-shape" src={bgShape2} alt="bgshape2"/>
                    <img className="bg-shape" src={bgShape3} alt="bgshape3"/>

                    {
                        isLoading
                            ? <Loading/>
                            : userInfo
                                ? <div className="profile-card__inner">
                                    <h3>Личный кабинет</h3>
                                    <h1>Основная информация</h1>
                                    <div className="main-info">
                                        <img src={userIcon} alt="Пользователь"/>
                                        <div>
                                            <h1 className="name">{`${userInfo.firstName} ${userInfo.lastName}`}</h1>
                                            <span className="phone-number">{`+${userInfo.phoneNumber[0]} (${userInfo.phoneNumber.slice(1, 4)}) ${userInfo.phoneNumber.slice(4, 7)} - ${userInfo.phoneNumber.slice(7, 9)} - ${userInfo.phoneNumber.slice(9, 11)}`}</span>
                                            <Button type="text" onClick={() => {
                                                localStorage.clear();
                                                dispatch(setUser(""));
                                                navigate("/")
                                            }}>Выйти из аккаунта</Button>
                                        </div>
                                    </div>

                                    <Button className="edit-button" type="main">Редактировать</Button>

                                    <div className="info">
                                        <div className="info-item">
                                            <h4>Куплено билетов:</h4>
                                            <span className="info-item-data">{userInfo.ticketsAmount ? userInfo.ticketsAmount : "-"}</span>
                                            <Button type="main" path="/tickets">Перейти в билеты</Button>
                                        </div>
                                        <div className="info-item">
                                            <h4>Любимый город:</h4>
                                            <span className="info-item-data">{userInfo.favouriteCity ? userInfo.favouriteCity : "-"}</span>
                                            <span className="visited-span">{userInfo.favouriteCityCount ? `Вы посещали этот город ${userInfo.favouriteCityCount} раз(а)` : ""}</span>
                                        </div>
                                        <div className="info-item">
                                            <h4>Email:</h4>
                                            <span className="info-item-data">{userInfo.email ? userInfo.email : "-"}</span>
                                        </div>
                                    </div>
                                </div>
                                : <span>Информации о пользователе нет</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;