import React, { useEffect, useState } from 'react';

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
    style?: React.CSSProperties;
    value?: string;
    label: string;
    name: string;
    type?: string;
    errorMessage?: string;
    length?: number;
    validation?: (text: string) => boolean;
    onTextChange?(text: string): void;
    onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
    isValid?(errorState: boolean): void;
    inputStyle?: React.CSSProperties;
    isDisabled?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
    style,
    value = '',
    label,
    name,
    type = 'text',
    errorMessage = '',
    length,
    validation,
    onTextChange,
    onKeyDown,
    isValid,
    inputStyle,
    isDisabled = false
}: TextFieldProps): JSX.Element => {
    const theme = useTheme();

    const [error, setError] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        setText(value);
    }, [value]);

    const onFieldChange = (text: string): void => {
        setText(text);
        if (onTextChange) onTextChange(text);
    };

    const inputValidation = (text: string): void => {
        if (validation && !validation(text)) {
            setError(true);
            if (isValid) isValid(false);
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
            if (isValid) isValid(true);
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
        <Container className={`${name}-field-container`} style={style}>
            <InputField
                tabIndex={isDisabled ? -1 : 0}
                className={isDisabled ? 'disabled' : ''}
                value={text}
                onKeyDown={onKeyDown}
                onChange={(event) => onFieldChange(event.target.value)}
                onBlur={(event) => inputValidation(event.target.value)}
                onFocus={clearError}
                name={name}
                type={type}
                theme={theme}
                error={error}
                maxLength={length}
                required
                style={inputStyle}
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
