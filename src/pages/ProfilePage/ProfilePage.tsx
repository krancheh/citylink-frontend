import React from 'react';
import userIcon from "../../assets/icons/user-icon.png";
import Button from "../../components/Button/Button";
import "./ProfilePage.scss";
import bgShape1 from "../../assets/images/profile-shape1.svg";
import bgShape2 from "../../assets/images/profile-shape2.svg";
import bgShape3 from "../../assets/images/profile-shape3.svg";

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <div className="wrapper">
                <div className="profile-card">
                    {/* bg shapes */}
                    <img className="bg-shape" src={bgShape1} alt="bgshape1"/>
                    <img className="bg-shape" src={bgShape2} alt="bgshape2"/>
                    <img className="bg-shape" src={bgShape3} alt="bgshape3"/>

                    <div className="profile-card__inner">
                        <h3>Личный кабинет</h3>
                        <h1>Основная информация</h1>
                        <div className="main-info">
                            <img src={userIcon} alt="Пользователь"/>
                            <div>
                                <h1 className="name">Кирилл Махонин</h1>
                                <span className="phone-number">+7 (921) 716-29-09</span>
                                <Button type="text" onClick={() => null}>Выйти из аккаунта</Button>
                            </div>
                        </div>

                        <Button className="edit-button" type="main">Редактировать</Button>

                        <div className="info">
                            <div className="info-item">
                                <h4>Куплено билетов:</h4>
                                <span className="info-item-data">25</span>
                                <Button type="main">Перейти в билеты</Button>
                            </div>
                            <div className="info-item">
                                <h4>Любимый город:</h4>
                                <span className="info-item-data">Ставрополь</span>
                                <span className="visited-span">Вы посещали этот город 10 раз</span>
                            </div>
                            <div className="info-item">
                                <h4>Email:</h4>
                                <span className="info-item-data">kakadama228@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;