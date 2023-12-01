import React from 'react';
import {Link} from "react-router-dom";
import './Button.scss'

type TProps = {
    children?: React.ReactNode;
    readonly type?: "default" | "main" | "text";
    text?: string;
    readonly path?: string;
    handler?: () => void;
    disabled?: boolean;
}

const Button: React.FC<TProps> = ({children, type = "default", text, handler, path}) => {

    if (path) {
        return (
            <Link className={`button ${type}`} to={path}>{children}</Link>
        )
    }

    return (
        <button className={`button ${type}`} onClick={handler}>{children}</button>
    )
};

export default Button;