import React, { useState} from 'react';
import "./Input.scss"

type TProps = {
    id: string;
    type?: string;
    label?: string;
    onChange?: (e: {target: {value: string}}) => void;
    onBlur?: (e: {target: {value: string}}) => void;
    formId?: string;
    errorMessage?: string;
    required?: boolean;
    placeholder?: string;
    autocomplete?: string;
}

type ElementType = {
    target: {
        value: string;
        type?: string;
        placeholder?: string;
        focus: () => void;
    }
}

const Input: React.FC<TProps> = (props) => {
    const {
        id,
        type = "text",
        label,
        formId,
        onChange,
        onBlur,
        errorMessage = "",
        required = false,
        placeholder,
        autocomplete,
    } = props;
    const [inputText, setInputText] = useState("");
    const [isActive, setIsActive] = useState(!!placeholder);

    const inputHandler = (e: ElementType) => {
        setInputText(e.target.value);
        if (e.target.value) {
            setIsActive(true);
        } else setIsActive(false);
        onChange && onChange(e);
    }

    const dateHandler = (e: ElementType) => {
        e.target.type = type;
        setIsActive(true);
    }

    return (
        <div className="input">
            <label htmlFor={id} className={`label ${isActive ? "active" : ""} ${required ? "required" : ""}`}>{label}</label>
            {type === "textarea"
                ?
                <textarea
                    id={id}
                    className={`input-element ${errorMessage ? "error" : ""}`}
                    form={formId}
                    onChange={inputHandler}
                    value={inputText}
                    required
                    placeholder={placeholder}
                />
                :
                <input
                    id={id}
                    className={`input-element ${errorMessage ? "error" : ""}`}
                    type={type === "date" ? "text" : type}
                    form={formId}
                    onChange={inputHandler}
                    value={inputText}
                    required
                    placeholder={placeholder}
                    onFocus={type === "date" ? dateHandler : undefined}
                    onBlur={onBlur}
                    autoComplete={autocomplete}
                />
            }
            <span className="error-message">{errorMessage}</span>
        </div>
    );
};

export default Input;