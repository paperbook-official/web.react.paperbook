import React from 'react';

import LoadingDots from '../../../components/atoms/LoadingDots';

import { Container, Label } from './styles';

interface ButtonProps {
    label: string;
    handleClick(): void;
    style?: React.CSSProperties;
    disabled?: boolean;
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    handleClick,
    style,
    disabled,
    isLoading
}: ButtonProps): JSX.Element => {
    return (
        <Container
            disabled={disabled}
            className={isLoading ? 'loading' : disabled ? 'disabled' : ''}
            style={style}
            onClick={handleClick}
        >
            {isLoading ? <LoadingDots /> : <Label>{label}</Label>}
        </Container>
    );
};

export default Button;
