import styled, { DefaultTheme } from 'styled-components';

interface ButtonStyleProps {
    theme: DefaultTheme;
    disabled: boolean;
}

export const Label = styled.span`
    color: ${(props: ButtonStyleProps) =>
        props.disabled
            ? props.theme.colors.defaultGrey
            : props.theme.colors.defaultDarkBlue};
    font-size: 1.3rem;
    font-weight: 500;

    transition: all 0.3s;
`;

export const Container = styled.button`
    ${(props: ButtonStyleProps) => !props.disabled && 'cursor: pointer;'}
    outline: none;
    background-color: transparent;
    border: 3px solid
        ${(props) =>
            props.disabled
                ? props.theme.colors.defaultGrey
                : props.theme.colors.defaultDarkBlue};
    border-radius: 150px;

    width: 210px;
    height: 60px;

    transition: all 0.3s;

    &:hover {
        ${(props: ButtonStyleProps) =>
            !props.disabled && 'border-color: transparent;'}
        background-color: ${(props) =>
            props.disabled
                ? 'transparent'
                : props.theme.colors.defaultDarkBlue};
        ${(props: ButtonStyleProps) =>
            !props.disabled && 'transform: translateY(-5px);'}
    }

    &:hover ${Label} {
        color: ${(props) =>
            props.disabled
                ? props.theme.colors.defaultGrey
                : props.theme.colors.defaultLightGrey};
    }
`;
