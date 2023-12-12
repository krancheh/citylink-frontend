import React from 'react';
import {ReactComponent as LoadingIcon} from "../../assets/icons/loading-icon.svg";
import "./Loading.scss";

const Loading = () => {
    return (
        <div className="loading">
            <LoadingIcon/>
        </div>
    );
};

export default Loading;