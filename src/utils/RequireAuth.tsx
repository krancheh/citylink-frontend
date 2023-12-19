import React, {useEffect} from 'react';
import AuthService from "../services/AuthService";
import {useAppDispatch, useAppSelector} from "../store";
import {selectUser, setIsLoading, setUser} from "../store/userSlice";
import {useLocation} from "react-router-dom";

const RequireAuth = () => {
    const dispatch = useAppDispatch();
    const firstName = useAppSelector(selectUser);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !firstName) {
            dispatch(setIsLoading(true));
            AuthService.auth()
                .then((result) => {
                    const { token, name } = result.data;
                    localStorage.setItem("token", token);
                    name && dispatch(setUser(name))
                })
                .catch((error) => {
                    console.log(error.message);
                    localStorage.clear()
                    dispatch(setUser(""))
                })
                .finally(() => {
                    dispatch(setIsLoading(false))
                })
        }
    }, [location])

    return null;
};

export default RequireAuth;