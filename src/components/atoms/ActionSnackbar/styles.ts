import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    right: 20px;
    top: 20px;

    min-width: 350px;
    max-width: 550px;
    max-height: 100px;
    padding: 15px;

    border-radius: 5px;

    transform: scale(0);

    & .text {
        font-size: 0.85rem;
    }

    &.action-snackbar-move-in-animation {
        animation-name: actionsnackbarmovein;
        animation-duration: 0.3s;
        animation-delay: 0s;
        animation-fill-mode: forwards;
    }

    &.action-snackbar-move-out-animation {
        animation-name: actionsnackbarmoveout;
        animation-duration: 0.4s;
        animation-delay: 0s;
        animation-fill-mode: forwards;
    }

    @keyframes actionsnackbarmovein {
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

    @keyframes actionsnackbarmoveout {
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

export const ActionButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ActionButton = styled.button`
    padding: 3px 7px;

    cursor: pointer;
    background: none;
    outline: none;
    border: none;
    border-radius: 5px;

    transition: all 0.3s;

    &:hover {
        background-color: #fff4;
    }
`;
