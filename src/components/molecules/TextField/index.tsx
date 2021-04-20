import React, { useEffect, useState } from 'react';

import { useTheme } from 'styled-components';

import { maskString } from '../../../utils/formatters';

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
    inputStyle?: React.CSSProperties;
    value?: string;
    label: string;
    name: string;
    type?: string;
    errorMessage?: string;
    length?: number;
    mask?: string;
    validation?: (text: string) => boolean;
    onTextChange?(text: string): void;
    onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
    isValid?(errorState: boolean): void;
    onInputBlur?(): void;
    onInputFocus?(): void;
    isDisabled?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
    style,
    inputStyle,
    value = '',
    label,
    name,
    type = 'text',
    errorMessage = '',
    length,
    mask,
    validation,
    onTextChange,
    onKeyDown,
    isValid,
    onInputBlur,
    onInputFocus,
    isDisabled = false
}: TextFieldProps): JSX.Element => {
    const theme = useTheme();

    const [error, setError] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        setText(mask ? maskString(value, mask) : value);
    }, [value]);

    const onFieldChange = (txt: string): void => {
        if (mask) {
            setText(maskString(txt, mask));

            if (onTextChange) {
                const maskElements: string[] = [];

                for (const symbol of mask) {
                    if (symbol !== '#' && !maskElements.includes(symbol))
                        maskElements.push(symbol);
                }

                let rawText = txt;
                for (const symbol of maskElements) {
                    const regex = new RegExp(
                        symbol === ' ' ? '[\\s]' : `\\${symbol}`,
                        'g'
                    );

                    rawText = rawText.replace(regex, '');
                }

                onTextChange(rawText);
            }
        } else {
            setText(txt);
            if (onTextChange) onTextChange(txt);
        }
    };

    const onBlur = (val: string): void => {
        inputValidation(val);
        if (onInputBlur) onInputBlur();
    };

    const onFocus = (): void => {
        clearError();
        if (onInputFocus) onInputFocus();
    };

    const inputValidation = (txt: string): void => {
        if (validation && !validation(txt)) {
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
                onBlur={(event) => onBlur(event.target.value)}
                onFocus={onFocus}
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
