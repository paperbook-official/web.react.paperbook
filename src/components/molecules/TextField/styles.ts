import styled, { DefaultTheme } from 'styled-components';

interface InputStyleProps {
    error: boolean;
    theme: DefaultTheme;
}

export const Container = styled.div`
    position: relative;
    width: 310px;
    height: 34px;

    &.error-animation {
        animation-name: shakefield;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: 0;
    }

    @keyframes shakefield {
        0% {
            transform: translateX(0px);
        }
        25% {
            transform: translateX(3px);
        }
        50% {
            transform: translateX(-3px);
        }
        75% {
            transform: translateX(3px);
        }
        100% {
            transform: translateX(0px);
        }
    }
`;

export const ErrorMessage = styled.span`
    position: absolute;
    left: 5px;
    bottom: -20px;

    width: 100%;

    color: ${(props) => props.theme.colors.defaultRed};
    font-size: 0.8rem;
    font-weight: 500;
`;

export const ErrorIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: 5px;
    bottom: 20%;

    width: 30px;
    height: 20px;

    opacity: 0;

    &.error-icon-animation {
        animation-name: showicon;
        animation-duration: 0.3s;
        animation-fill-mode: forwards;
        animation-delay: 0;
    }

    @keyframes showicon {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

export const InputLabel = styled.label`
    position: absolute;
    left: 5px;

    pointer-events: none;
    color: ${(props: InputStyleProps) =>
        props.error
            ? props.theme.colors.defaultRed
            : props.theme.colors.defaultGrey};
    font-weight: 400;

    transition: all 0.3s;
`;

export const InputBorder = styled.span`
    display: block;
    position: absolute;
    bottom: 2px;
    right: 0;

    width: 100%;
    height: 1px;
    background-color: ${(props: InputStyleProps) =>
        props.error
            ? props.theme.colors.defaultRed
            : props.theme.colors.defaultGrey};

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 2px;

        background-color: ${(props: InputStyleProps) =>
            props.error
                ? props.theme.colors.defaultRed
                : props.theme.colors.defaultHighlightGreyBlue};
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s ease-in-out, background-color 0.3s;
    }
`;

export const InputField = styled.input`
    height: 100%;
    width: 100%;

    padding: 0 5px;

    color: ${(props: InputStyleProps) =>
        props.error
            ? props.theme.colors.defaultRed
            : props.theme.colors.defaultDarkGrey};
    outline: none;
    box-shadow: none;
    background-color: transparent;
    border: none;

    transition: all 0.3s;

    &:focus ~ ${InputBorder}::before, &:valid ~ ${InputBorder}::before {
        transform: scaleX(1);
        background-color: ${(props: InputStyleProps) =>
            props.error
                ? props.theme.colors.defaultRed
                : props.theme.colors.defaultDarkBlue};
    }

    &:focus ~ ${InputBorder}::before {
        background-color: ${(props: InputStyleProps) =>
            props.error
                ? props.theme.colors.defaultRed
                : props.theme.colors.defaultHighlightGreyBlue};
    }

    &:focus ~ ${InputLabel}, &:valid ~ ${InputLabel} {
        transform: translateY(-15px);
        color: ${(props: InputStyleProps) =>
            props.error
                ? props.theme.colors.defaultRed
                : props.theme.colors.defaultDarkBlue};
        font-size: 0.8rem;
        font-weight: 500;
    }

    &:focus ~ ${InputLabel} {
        color: ${(props: InputStyleProps) =>
            props.error
                ? props.theme.colors.defaultRed
                : props.theme.colors.defaultHighlightGreyBlue};
    }

    &.disabled {
        pointer-events: none;
        color: ${(props) => props.theme.colors.defaultDarkBlue};
    }

    &.disabled ~ ${InputLabel} {
        color: ${(props) => props.theme.colors.defaultGrey};
    }

    &.disabled ~ ${InputBorder}::before {
        background-color: ${(props) => props.theme.colors.defaultGrey};
    }
`;
