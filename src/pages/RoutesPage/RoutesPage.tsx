import React, {useEffect} from 'react';
import './RoutesPage.scss';
import SearchForm from "../../components/SearchForm/SearchForm";
import {URLSearchParamsInit, useSearchParams} from "react-router-dom";

interface SearchFormData {
    target: {
        departureCity: {
            value: string;
        };
        destinationCity: {
            value: string;
        };
        departureDate: {
            value: string;
        }
    }
    preventDefault: () => void;
}


const RoutesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams({});

    const departureCity = searchParams.get("departureCity") || "";
    const destinationCity = searchParams.get("destinationCity") || "";
    const departureDate = searchParams.get("departureDate") || "";

    useEffect(() => {
        if (departureCity && destinationCity && departureDate) {
            // запрос на поиск
        }
    }, []);

    const handleSearch = (e: SearchFormData) => {
        e.preventDefault();

        const data: URLSearchParamsInit = {
            departureCity: e.target.departureCity.value,
            destinationCity: e.target.destinationCity.value,
            departureDate: e.target.departureDate.value,
        }

        // запрос на поиск

        setSearchParams(data);
    }

    return (
        <div className="routes-page">
            <div className="wrapper">
                <div className="routes-page__inner">
                    <SearchForm/>
                </div>
            </div>
        </div>
    );
};

export default RoutesPage;