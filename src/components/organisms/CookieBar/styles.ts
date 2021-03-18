import styled from 'styled-components';

interface TextButtonProps {
    textColor: string;
    backgroundColor: string;
    textColorHover: string;
    backgroundColorHover: string;
}

export const Container = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;

    width: 340px;
    height: 150px;
    border-radius: 5px;
    padding: 20px;

    transform: translateY(180px);

    background-color: ${(props) => props.theme.colors.defaultDarkBlue};

    &.cookie-bar-move-in-animation {
        animation-name: cookiebarentering;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
    }

    &.cookie-bar-move-out-animation {
        animation-name: cookiebarleaving;
        animation-duration: 0.4s;
        animation-delay: 0s;
        animation-fill-mode: forwards;
    }

    @keyframes cookiebarentering {
        0% {
            transform: translateY(180px);
        }
        60% {
            transform: translateY(-20px);
        }
        100% {
            transform: translateY(0px);
        }
    }

    @keyframes cookiebarleaving {
        0% {
            transform: translateY(0px);
        }
        60% {
            transform: translateY(-20px);
        }
        100% {
            transform: translateY(180px);
        }
    }
`;

export const CookieText = styled.span`
    color: ${(props) => props.theme.colors.defaultLightGrey};
    font-size: 1.1rem;
`;

export const ActionContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    height: auto;
`;

export const TextButton = styled.div`
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;

    color: ${(props: TextButtonProps) => props.textColor};
    background-color: ${(props: TextButtonProps) => props.backgroundColor};

    transition: all 0.2s;

    &:hover {
        color: ${(props: TextButtonProps) => props.textColorHover};
        background-color: ${(props: TextButtonProps) =>
            props.backgroundColorHover};
    }
`;
