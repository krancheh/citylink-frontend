import React from 'react';
import {Link} from "react-router-dom";
import './Button.scss'

type TProps = {
    className?: string;
    children?: React.ReactNode;
    readonly type?: "default" | "main" | "text";
    readonly path?: string;
    handler?: () => void;
    disabled?: boolean;
}

const Button: React.FC<TProps> = ({className, children, type = "default", handler, path}) => {

    if (path) {
        return (
            <Link className={`button ${type} ${className}`} to={path}>{children}</Link>
        )
    }

    return (
        <button className={`button ${type} ${className}`} onClick={handler}>{children}</button>
    )
};

export default Button;