import styled, { DefaultTheme } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 7px;

    & div {
        height: 15px;
        width: 15px;

        border-radius: 50%;
        background-color: ${(props: { color?: string; theme: DefaultTheme }) =>
            props.color && props.color?.length > 0
                ? props.color
                : props.theme.colors.defaultBlue};

        transform: translateY(0);

        transition: all 0.3s;
    }

    & div.dot1 {
        animation: animateDot1 1s infinite ease-in-out;
    }

    & div.dot2 {
        animation: animateDot2 1s infinite ease-in-out;
    }

    & div.dot3 {
        animation: animateDot3 1s infinite ease-in-out;
    }

    & div.dot4 {
        animation: animateDot4 1s infinite ease-in-out;
    }

    @keyframes animateDot1 {
        0% {
            transform: translateY(0);
        }
        20% {
            transform: translateY(-15px);
        }
        40%,
        100% {
            transform: translateY(0);
        }
    }

    @keyframes animateDot2 {
        0%,
        10% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-15px);
        }
        60%,
        100% {
            transform: translateY(0);
        }
    }

    @keyframes animateDot3 {
        0%,
        30% {
            transform: translateY(0);
        }
        60% {
            transform: translateY(-15px);
        }
        80%,
        100% {
        }
    }

    @keyframes animateDot4 {
        0%,
        50% {
            transform: translateY(0);
        }
        80% {
            transform: translateY(-15px);
        }
        100% {
            transform: translateY(0);
        }
    }
`;
