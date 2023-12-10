import React, {FormEventHandler} from 'react';
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./SearchForm.scss";
import {ReactComponent as SwapIcon} from "../../assets/icons/swap-icon.svg";
import {URLSearchParamsInit} from "react-router-dom";

interface TProps {
    departureCityState: {
        departureCity: string;
        setDepartureCity: (city: string) => void;
    }
    destinationCityState: {
        destinationCity: string;
        setDestinationCity: (city: string) => void;
    }
    departureDateState: {
        departureDate: string;
        setDepartureDate: (date: string) => void;
    }
    searchPerformed: boolean;
    handleSearch: FormEventHandler<Element>;
    searchFormRef: any;
}

const SearchForm: React.FC<TProps> = ({
        searchFormRef,
        searchPerformed,
        handleSearch,
        departureCityState,
        destinationCityState,
        departureDateState
    }) => {

    const swapHandler = () => {
        const temp = departureCityState.departureCity;
        departureCityState.setDepartureCity(destinationCityState.destinationCity);
        destinationCityState.setDestinationCity(temp);
    }

    return (
        <form className={`search-form ${searchPerformed ? "active" : ''}`} onSubmit={event => handleSearch(event)} ref={searchFormRef}>
            <h1>Поиск расписаний автобусов</h1>
            <p>Найти билеты легко и быстро на любой автобусный маршрут на территории юга России</p>
            <div className="search-inputs">
                <div className="city-inputs">
                    <div className="city-input">
                        <Input id="departureCity" value={departureCityState.departureCity} setValue={departureCityState.setDepartureCity} label="Откуда" required/>
                        <p>Например: <Button type="text">Ставрополь</Button></p>
                    </div>

                    <Button type="text" className="swap-button" onClick={swapHandler}><SwapIcon/></Button>

                    <div className="city-input">
                        <Input id="destinationCity" value={destinationCityState.destinationCity} setValue={destinationCityState.setDestinationCity} label="Куда" required/>
                        <p>Например: <Button type="text">Краснодар</Button></p>
                    </div>
                </div>

                <div className="date-inputs">
                    <div className="date-input">
                        <Input id="departureDate" value={departureDateState.departureDate} setValue={departureDateState.setDepartureDate} type="date" label="Дата" required/>
                        <p><Button type="text">Сегодня</Button>, <Button type="text">Завтра</Button></p>
                    </div>

                    <Button type="main" submit>Найти</Button>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;