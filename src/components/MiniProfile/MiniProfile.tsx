import React from 'react';
import "./MiniProfile.scss";
import Button from "../Button/Button";
import {selectIsLoading, selectUser} from "../../store/userSlice";
import {ReactComponent as CaretDown} from "../../assets/icons/caret-down-icon.svg";
import {useAppSelector} from "../../store";
import Loading from "../Loading/Loading";

const MiniProfile: React.FC = () => {

    const name: string = useAppSelector(selectUser);
    const isLoading: boolean = useAppSelector(selectIsLoading)

    return (
        <div className="mini-profile">
            {isLoading
                ? name
                    ? <>
                        <span>{name}</span>
                        <CaretDown/>
                    </>
                    : <>
                        <Button type="text" path="/login">Войти</Button>
                        <Button type="main" path="/signup">Регистрация</Button>
                    </>
                : <p>Loading..</p>
            }
        </div>
    );
};

export default MiniProfile;