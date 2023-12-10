import React, {useEffect, useState} from 'react';
import AuthService from "../services/AuthService";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RequireAuth = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {
        AuthService.auth()
            .then(({token}) => {
                if (token) {
                    localStorage.setItem("token", token);
                    setIsSuccess(true);
                }
                else throw new Error("Token error");
            })
            .catch((error) => {
                console.log(error.message);
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])



    // if (isError) {
    //     localStorage.clear();
    //     return <Navigate to="/login" state={{from: location}} replace/>
    // }


    return (
        isLoading
            ? <div>Loading..</div>
            : isSuccess
                ? <Outlet/> : null
    );
};

export default RequireAuth;