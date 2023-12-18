import React, {useEffect, useState} from 'react';
import {createPortal} from "react-dom";

interface TProps {
    id: string;
    children: React.ReactNode;
}

interface ContainerOptions {
    id: string;
    mountNode?: HTMLElement;
}

const createContainer = (options: ContainerOptions) => {
    if (document.getElementById(options.id)) return;

    const { id, mountNode = document.body } = options;
    const portalContainer = document.createElement('div');

    portalContainer.setAttribute('id', id);
    mountNode.appendChild(portalContainer);
}

const Portal = (props: TProps) => {
    const {id, children} = props;
    const [container, setContainer] = useState<HTMLElement>();

    useEffect(() => {
        if (id) {
            const portalContainer = document.getElementById(id);

            if (!portalContainer) throw new Error("Не задан контейнер для portal");

            setContainer(portalContainer);
        }
    }, [id])

    return container ? createPortal(children, container) : null;
};

export {createContainer};
export default Portal;
