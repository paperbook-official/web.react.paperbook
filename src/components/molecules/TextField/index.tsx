import React, { useState } from 'react';

import { useTheme } from 'styled-components';

import { ReactComponent as AlertIcon } from '../../../assets/icons/alert-triangle.svg';

import {
    Container,
    ErrorIconContainer,
    ErrorMessage,
    InputBorder,
    InputField,
    InputLabel
} from './styles';

interface TextFieldProps {
    value: string;
    label: string;
    name: string;
    type?: string;
    errorMessage?: string;
    validation?: (text: string) => boolean;
    onTextChange(text: string): void;
    onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
}

const TextField: React.FC<TextFieldProps> = ({
    value = '',
    label,
    name,
    type = 'text',
    errorMessage = '',
    validation,
    onTextChange,
    onKeyDown
}: TextFieldProps): JSX.Element => {
    const theme = useTheme();

    const [error, setError] = useState(false);

    const inputValidation = (text: string): void => {
        if (validation && !validation(text)) {
            setError(true);
            const container = document.getElementsByClassName(
                name + '-field-container'
            )[0];
            container.classList.add('error-animation');

            const icon = document.getElementsByClassName(
                name + '-error-icon'
            )[0];
            icon.classList.add('error-icon-animation');
        }
    };

    const clearError = (): void => {
        if (validation) {
            setError(false);
            const icon = document.getElementsByClassName(
                name + '-error-icon'
            )[0];
            const container = document.getElementsByClassName(
                name + '-field-container'
            )[0];
            if (container.classList.contains('error-animation'))
                container.classList.remove('error-animation');
            if (icon.classList.contains('error-icon-animation'))
                icon.classList.remove('error-icon-animation');
        }
    };

    return (
        <Container className={`${name}-field-container`}>
            <InputField
                value={value}
                onKeyDown={onKeyDown}
                onChange={(event) => onTextChange(event.target.value)}
                onBlur={(event) => inputValidation(event.target.value)}
                onFocus={clearError}
                name={name}
                type={type}
                theme={theme}
                error={error}
                required
            />
            <InputLabel error={error}>{label}</InputLabel>
            <InputBorder error={error}></InputBorder>
            {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <ErrorIconContainer className={`${name}-error-icon`} theme={theme}>
                <AlertIcon
                    height="20"
                    width="20"
                    color={theme.colors.defaultRed}
                />
            </ErrorIconContainer>
        </Container>
    );
};

export default TextField;
