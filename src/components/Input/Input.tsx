import React, { ChangeEventHandler, useEffect, useState } from 'react';
import "./Input.scss"
import createDebounce from '../../utils/createDebounce';

type TProps = {
    id: string;
    value: string;
    setValue: (value: string) => void;
    type?: string;
    label?: string;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    formId?: string;
    errorMessage?: string;
    required?: boolean;
    placeholder?: string;
    autocomplete?: string;
    suggestions?: string[];
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
        value,
        setValue,
        formId,
        onChange,
        onBlur,
        errorMessage = "",
        required = false,
        placeholder,
        autocomplete,
        suggestions
    } = props;
    const [isActive, setIsActive] = useState(!!placeholder || !!value);
    const [isFocused, setIsFocused] = useState(false);

    const inputHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setValue(e.target.value);
        onChange && onChange(e);
    }

    useEffect(() => {
        if (value) {
            setIsActive(true);
        } else !placeholder && setIsActive(false);
    }, [value])

    const dateHandler = (e: ElementType) => {
        e.target.type = type;
        setIsActive(true);
    }

    const debouncedBlur = createDebounce(() => {
        setIsFocused(false);
    }, 100)

    return (
        <div className="input">
            <label htmlFor={id} className={`label ${isActive ? "active" : ""} ${required ? "required" : ""}`}>{label}</label>
            {type === "textarea"
                ?
                <textarea
                    id={id}
                    name={id}
                    className={`input-element ${errorMessage ? "error" : ""}`}
                    form={formId}
                    onChange={inputHandler}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                />
                :
                <input
                    id={id}
                    name={id}
                    className={`input-element ${errorMessage ? "error" : ""}`}
                    type={type === "date" ? "text" : type}
                    form={formId}
                    onChange={inputHandler}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    onFocus={type === "date" ? dateHandler : () => setIsFocused(true)}
                    onBlur={(e) => {
                        onBlur && onBlur(e);
                        debouncedBlur();
                    }}
                    autoComplete={autocomplete}
                />
            }
            <span className="error-message">{errorMessage}</span>
            {
                !!suggestions?.length && isFocused &&
                <div className='suggestions'>
                    {suggestions.map(suggestion => (
                        <div key={suggestion} className='suggestion' onClick={() => setValue(suggestion)}>{suggestion}</div>
                    ))}
                </div>
            }
        </div >
    );
};

export default Input;