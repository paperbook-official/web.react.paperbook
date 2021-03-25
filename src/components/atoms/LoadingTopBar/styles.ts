import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;

    background-color: ${(props) => props.theme.colors.defaultBlue};

    animation-name: loadingTopBar;
    animation-duration: 2s;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;

    @keyframes loadingTopBar {
        0% {
            width: 10%;
            left: -10%;
        }
        50% {
            width: 30%;
        }
        100% {
            width: 10%;
            left: 110%;
        }
    }
`;
