import React from 'react';

import { Container } from './styles';

interface ModalProps {
    children: JSX.Element;
    onClickOutside?(): void;
}

const Modal: React.FC<ModalProps> = ({
    children,
    onClickOutside
}: ModalProps): JSX.Element => {
    const handleContainerClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        if (
            (event.target as HTMLElement).id === 'modal-container' &&
            onClickOutside
        ) {
            onClickOutside();
        }
    };

    return (
        <Container
            id="modal-container"
            onClick={(event) => handleContainerClick(event)}
        >
            {children}
        </Container>
    );
};

export default Modal;
