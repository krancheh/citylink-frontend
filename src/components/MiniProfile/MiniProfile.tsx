import React from 'react';
import "./MiniProfile.scss";
import Button from "../Button/Button";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/userSlice";
import {ReactComponent as CaretDown} from "../../assets/icons/caret-down-icon.svg";

interface User {
    id: string;
    name: string;
}

const MiniProfile: React.FC = () => {

    const user: User = useSelector(selectUser);

    return (
        <div className="mini-profile">
            {user
                ? <>
                    <span>{user.name}</span>
                    <CaretDown/>
                </>
                : <>
                    <Button type="text" path="/login">Войти</Button>
                    <Button type="main" path="/signup">Регистрация</Button>
                </>}
        </div>
    );
};

export default MiniProfile;