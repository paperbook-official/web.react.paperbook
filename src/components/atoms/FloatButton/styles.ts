import styled from 'styled-components';

export const Button = styled.div`
    position: fixed;
    bottom: 1.8rem;
    right: 1.8rem;
    z-index: 100;
    height: 60px;
    width: 60px;

    border-radius: 40px;

    background-color: #1a4152;
    box-shadow: 0 12px 24px 2px rgba(0, 0, 0, 0.5),
        0 6px 30px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -5px rgba(0, 0, 0, 0.2);

    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s;

    & > svg {
        transform: scale(1.2);
        &:hover {
            transform: scale(1.4);
        }
    }

    &:active {
        transform: scale(0.8);

        svg {
            transform: scale(1.1);
        }
    }

    &.active {
        display: none !important;
    }

    &.animate-out {
        animation: fade-out 0.1s ease-in;
    }

    &.animate-in {
        animation: fade-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes fade-in {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes fade-out {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }
`;
