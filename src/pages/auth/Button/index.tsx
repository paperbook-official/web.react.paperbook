import React from 'react';

import { Container, Label } from './styles';

interface ButtonProps {
    label: string;
    handleClick(): void;
    style?: React.CSSProperties;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label = 'Label',
    handleClick,
    style,
    disabled = false
}: ButtonProps): JSX.Element => {
    return (
        <Container disabled={disabled} style={style} onClick={handleClick}>
            <Label disabled={disabled}>{label}</Label>
        </Container>
    );
};

export default Button;
