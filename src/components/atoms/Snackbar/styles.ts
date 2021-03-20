import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    right: 20px;
    top: 20px;

    width: 350px;
    max-height: 100px;
    padding: 15px;

    border-radius: 5px;

    transform: scale(0);

    &.snackbar-move-in-animation {
        animation-name: snackbarmovein;
        animation-duration: 0.3s;
        animation-delay: 0s;
        animation-fill-mode: forwards;
    }

    &.snackbar-move-out-animation {
        animation-name: snackbarmoveout;
        animation-duration: 0.4s;
        animation-delay: 0s;
        animation-fill-mode: forwards;
    }

    @keyframes snackbarmovein {
        0% {
            transform: scale(0);
        }
        70% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes snackbarmoveout {
        0% {
            transform: translateX(0);
        }
        30% {
            transform: translateX(-10px);
        }
        100% {
            transform: translateX(380px);
        }
    }
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const Title = styled.span`
    font-size: 1.1rem;
    font-weight: 600;
`;

export const Description = styled.span`
    font-size: 0.9rem;
    font-weight: 400;
`;

export const CloseButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;

    margin-left: 30px;

    cursor: pointer;

    border-radius: 50px;
`;
