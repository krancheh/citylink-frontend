import React, {ReactHTMLElement, useState} from 'react';
import "./Input.scss"

type TProps = {
    type?: string;
    label?: string;
    handler?: () => void;
    formId?: string;
}

const Input: React.FC<TProps> = ({type = "text", label, formId, handler}) => {
    const [inputText, setInputText] = useState("");

    const inputHandler = (e: {target: {value: string}}) => {
        setInputText(e.target.value);
    }

    return (
        <div className="input">
            <span className={inputText && "active"}>{label}</span>
            {type === "textarea"
                ? <textarea className="input-element" form={formId} onChange={inputHandler} value={inputText}/>
                : <input className="input-element" type={type} form={formId} onChange={inputHandler} value={inputText}/>
            }
        </div>
    );
};

export default Input;