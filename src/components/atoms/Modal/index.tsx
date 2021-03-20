import React from 'react';

import { Container } from './styles';

interface ModalProps {
    children: JSX.Element;
}

const Modal: React.FC<ModalProps> = ({ children }: ModalProps): JSX.Element => {
    return <Container>{children}</Container>;
};

export default Modal;
