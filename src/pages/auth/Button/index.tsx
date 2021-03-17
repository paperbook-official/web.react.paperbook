import React from 'react';

import { Container, Label } from './styles';

interface ButtonProps {
    label: string;
    handleClick(): void;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
    label = 'Label',
    handleClick,
    style
}: ButtonProps): JSX.Element => {
    return (
        <Container style={style} onClick={handleClick}>
            <Label>{label}</Label>
        </Container>
    );
};

export default Button;
