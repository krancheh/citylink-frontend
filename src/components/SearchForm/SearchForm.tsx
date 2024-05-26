import React, { FormEventHandler, useCallback, useState } from 'react';
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./SearchForm.scss";
import { ReactComponent as SwapIcon } from "../../assets/icons/swap-icon.svg";
import { URLSearchParamsInit } from "react-router-dom";
import createDebounce from '../../utils/createDebounce';
import TicketService from '../../services/TicketService';
import { City } from '../../types';

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

const SearchForm = (props: TProps) => {
    const {
        searchFormRef,
        searchPerformed,
        handleSearch,
        departureCityState,
        destinationCityState,
        departureDateState
    } = props;

    const [departureCitiesSuggestions, setDepartureCitiesSuggestions] = useState<City[]>([]);
    const [destinationCitiesSuggestions, setDestinationCitiesSuggestions] = useState<City[]>([]);

    const swapHandler = () => {
        const temp = departureCityState.departureCity;
        departureCityState.setDepartureCity(destinationCityState.destinationCity);
        destinationCityState.setDestinationCity(temp);
    }

    const departureCitySearch = createDebounce(async (cityName: string) => {
        try {
            const { data } = await TicketService.getCities(cityName);
            setDepartureCitiesSuggestions(data.cities);
        } catch (e) {
            console.log(e);
        }
    }, 350);

    const debouncedDepartureCitySearch = useCallback(departureCitySearch, []);

    const destinationCitySearch = createDebounce(async (cityName: string) => {
        try {
            const { data } = await TicketService.getCities(cityName);
            setDestinationCitiesSuggestions(data.cities);
        } catch (e) {
            console.log(e);
        }
    }, 350);

    const debouncedDestinationCitySearch = useCallback(destinationCitySearch, []);

    return (
        <form className={`search-form ${searchPerformed ? "active" : ''}`} onSubmit={event => handleSearch(event)} ref={searchFormRef}>
            <h1>Поиск расписаний автобусов</h1>
            <p>Найти билеты легко и быстро на любой автобусный маршрут на территории юга России</p>
            <div className="search-inputs">
                <div className="city-inputs">
                    <div className="city-input">
                        <Input
                            id="departureCity"
                            value={departureCityState.departureCity}
                            setValue={departureCityState.setDepartureCity}
                            label="Откуда"
                            onChange={() => debouncedDepartureCitySearch(departureCityState.departureCity)}
                            suggestions={departureCitiesSuggestions.map(city => city.cityName)}
                            autocomplete='off'
                            required
                        />
                        <p>Например: <Button type="text" onClick={() => departureCityState.setDepartureCity("Ставрополь")}>Ставрополь</Button></p>
                    </div>

                    <Button type="text" className="swap-button" onClick={swapHandler}><SwapIcon /></Button>

                    <div className="city-input">
                        <Input
                            id="destinationCity"
                            value={destinationCityState.destinationCity}
                            setValue={destinationCityState.setDestinationCity}
                            label="Куда"
                            onChange={() => debouncedDestinationCitySearch(destinationCityState.destinationCity)}
                            suggestions={destinationCitiesSuggestions.map(city => city.cityName)}
                            autocomplete='off'
                            required
                        />
                        <p>Например: <Button type="text" onClick={() => destinationCityState.setDestinationCity("Краснодар")}>Краснодар</Button></p>
                    </div>
                </div>

                <div className="date-inputs">
                    <div className="date-input">
                        <Input id="departureDate" value={departureDateState.departureDate} setValue={departureDateState.setDepartureDate} type="date" label="Дата" />
                        <p><Button type="text" onClick={() => {
                            const date = new Date();
                            departureDateState.setDepartureDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
                        }}>Сегодня</Button>, <Button type="text" onClick={() => {
                            const date = new Date();
                            departureDateState.setDepartureDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`)
                        }}>Завтра</Button></p>
                    </div>

                    <Button type="main" submit>Найти</Button>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;