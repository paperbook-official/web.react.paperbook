import React from 'react';

import { useTheme } from 'styled-components';

import { ReactComponent as CheckIcon } from '../../../assets/icons/check.svg';

import { Container } from './styles';

interface CheckboxProps {
    isActive: boolean;
    onClick(): void;
}

const Checkbox: React.FC<CheckboxProps> = ({
    isActive,
    onClick
}: CheckboxProps): JSX.Element => {
    const theme = useTheme();
    const iconSize = 14;

    return (
        <Container onClick={onClick} theme={theme}>
            {isActive && (
                <CheckIcon
                    color="#1A4152"
                    width={`${iconSize}px`}
                    height={`${iconSize}px`}
                />
            )}
        </Container>
    );
};

export default Checkbox;
