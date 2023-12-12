import React, {ChangeEventHandler, useState} from 'react';
import "./Input.scss"

type TProps = {
    id: string;
    value: string;
    setValue: (value: string) => void;
    type?: string;
    label?: string;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
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
        value,
        setValue,
        formId,
        onChange,
        onBlur,
        errorMessage = "",
        required = false,
        placeholder,
        autocomplete,
    } = props;
    const [isActive, setIsActive] = useState(!!placeholder || !!value);

    const inputHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setValue(e.target.value || "");
        if (e.target.value) {
            setIsActive(true);
        } else !placeholder && setIsActive(false);
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