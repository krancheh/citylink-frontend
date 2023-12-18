import React, {MouseEventHandler} from 'react';
import {Link} from "react-router-dom";
import './Button.scss'

type TProps = {
    className?: string;
    children?: React.ReactNode;
    readonly type?: "default" | "main" | "text";
    readonly path?: string;
    onClick?: () => void;
    disabled?: boolean;
    submit?: boolean;
}

const Button: React.FC<TProps> = ({className, children, type = "default", onClick, path, submit = false}) => {

    if (path) {
        return (
            <Link className={`button ${type} ${className}`} to={path}>{children}</Link>
        )
    }

    return (
        <button type={submit ? "submit" : "button"} className={`button ${type} ${className}`} onClick={onClick}>{children}</button>
    )
};

export default Button;