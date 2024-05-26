import React, { useState } from 'react';
import './LandingPage.scss'
import Button from "../../components/Button/Button";
import { ReactComponent as Vector } from "../../assets/vector.svg";
import { ReactComponent as BgShape1 } from "../../assets/images/bg-shape1.svg";
import { ReactComponent as BgShape2 } from "../../assets/images/bg-shape2.svg";
import { ReactComponent as BgShape3 } from "../../assets/images/bg-shape3.svg";
import FastIcon from "../../assets/icons/fast-icon.png";
import PromiseIcon from "../../assets/icons/promise-icon.png";
import TwentyFourSevenIcon from "../../assets/icons/247-icon.png";
import landingPic from "../../assets/images/abobus.png"
import landingPic2 from "../../assets/images/abobus2.png"
import Input from "../../components/Input/Input";

const LandingPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    return (
        <main>
            <section className='welcome-section'>
                <BgShape1 className="bg-shape1" />
                <BgShape2 className="bg-shape2" />
                <div className="wrapper">
                    <div className="welcome-section-content">
                        <div className="content__left">
                            <h1>Ваш надежный маршрут к <span>комфортному путешествию</span></h1>
                            <p><span>CityLink</span> гарантирует опыт, комфорт и безопасность на каждом километре.
                                Присоединяйтесь к путешествию первого класса по дорогам страны!</p>
                            <Button type="main" path="/routes">Подобрать маршрут</Button>
                        </div>
                        <div className="content__right">
                            <Vector />
                            <img src={landingPic} alt="abobus" />
                        </div>
                    </div>
                </div>
                <BgShape3 className="bg-shape3" />

            </section>

            <section className="slider-section">
                <div className="wrapper">
                    <div className="slider-section-content">
                        <h2>Осуществляем перевозки
                            в более чем <span>150+</span> городах юга России!</h2>
                        <div className="slider">
                            <div className="animated">
                                <span>Ставрополь</span>
                                <span>Краснодар</span>
                                <span>Сочи</span>
                                <span>Невинномысск</span>
                                <span>Пятигорск</span>
                                <span>Кисловодск</span>
                                <span>Ростов-на-Дону</span>
                                <span>Астрахань</span>
                                <span>Махачкала</span>
                            </div>
                            <div className="animated">
                                <span>Ставрополь</span>
                                <span>Краснодар</span>
                                <span>Сочи</span>
                                <span>Невинномысск</span>
                                <span>Пятигорск</span>
                                <span>Кисловодск</span>
                                <span>Ростов-на-Дону</span>
                                <span>Астрахань</span>
                                <span>Махачкала</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="advantages-section">
                <div className="wrapper">
                    <div className="advantages-content">
                        <h2>Почему City<span>Link</span>?</h2>
                        <div className="advantages">
                            <div>
                                <img src={FastIcon} alt="fast-icon" />
                                <h3>Быстро и безопасно</h3>
                                <p>Водители проходят тщательную подготовку
                                    и профессионально выполняют свою работу!</p>
                            </div>

                            <div>
                                <img src={PromiseIcon} alt="promise-icon" />
                                <h3>Нам доверяют</h3>
                                <p>Услугами нашей компании воспользовались
                                    более 150 000 человек за последний год</p>
                            </div>

                            <div>
                                <img src={TwentyFourSevenIcon} alt="24/7-icon" />
                                <h3>Всегда с вами</h3>
                                <p>Перевозки осуществляются круглосуточно,
                                    как и работа службы поддержки </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="questions-section">
                <div className="wrapper">
                    <div className="questions-content">
                        <form>
                            <h2>Остались вопросы?
                                Напишите нам!</h2>
                            <Input id="name" value={name} setValue={setName} label="Имя" />
                            <Input id="email" value={email} setValue={setEmail} type="email" label="Email" />
                            <Input id="message" value={message} setValue={setMessage} type="textarea" label="Сообщение" />
                            <Button type="main">Отправить</Button>
                        </form>

                        <div className="questions-picture">
                            <Vector style={{ transform: "rotate(-160deg) scaleX(-1)" }} />
                            <img src={landingPic2} alt="abobus2" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default LandingPage;