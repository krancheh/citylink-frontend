import React, {MouseEventHandler, useCallback, useEffect, useRef, useState} from 'react';
import Portal, {createContainer} from "../Portal/Portal";
import "./Modal.scss";

interface TProps {
    title: string;
    onClose?: () => void;
    children: React.ReactNode | React.ReactNode[];
}

const MODAL_ID = 'modal';

const Modal = (props: TProps) => {

    const {title, children, onClose} = props;

    const rootRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        onClose?.();
    }, [onClose])


    useEffect(() => {
        const handleWrapperClick = (e: MouseEvent) => {
            const { target } = e;

            if (target instanceof Node && rootRef.current === target) {
                onClose?.();
            }
        };

        const handleEscapeClick = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose?.();
            }
        };

        window.addEventListener("click", handleWrapperClick);
        window.addEventListener("keydown", handleEscapeClick);

        return () => {
            window.removeEventListener("click", handleWrapperClick);
            window.removeEventListener("keydown", handleEscapeClick);
        };
    }, [onClose])


    useEffect(() => {
        createContainer({ id: MODAL_ID })
        setIsMounted(true);
    }, [])

    return (
        isMounted 
            ? <Portal id={MODAL_ID}>
                <div className="modal-wrapper" ref={rootRef}>
                    <div className="modal-content">
                        <h2 className="modal-title">{title}</h2>
                        {children}
                        <button className="modal-close-button" onClick={handleClose}>✖</button>
                    </div>
                </div>
              </Portal>
            : null
    );
};

export default Modal;