import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    min-height: 200vh;
    width: 100%;

    background-color: ${(props) => props.theme.colors.background};
`;

export const FirstPageContainer = styled.div`
    position: relative;
    height: 100vh;
    width: 100%;
`;

export const ImageContainer = styled.div`
    position: relative;
    height: 100%;
    width: 100%;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;

        background: linear-gradient(
            180deg,
            rgba(32, 32, 32, 0.83) 0%,
            rgba(45, 157, 165, 0.2) 70%,
            rgba(239, 239, 239, 0) 90%,
            rgba(239, 239, 239, 1) 100%
        );
        border-bottom: 5px solid rgba(239, 239, 239, 1);
    }
`;

export const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    filter: blur(2px);
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    width: 400px;
    position: absolute;
    top: 50%;
    left: 25%;

    transform: translate(-25%, -50%);
`;

export const Title = styled.h1`
    color: ${(props) => props.theme.colors.defaultDarkBlue};
    font-size: 2.4rem;
    text-shadow: 0px 0px 2px #ccc;
`;

export const Description = styled.p`
    color: ${(props) => props.theme.colors.background};
    text-shadow: 1px 1px 0 #333;
`;

export const ScrollDown = styled.span`
    position: absolute;
    bottom: 20px;
    left: 50%;

    cursor: pointer;
    color: ${(props) => props.theme.colors.defaultDarkBlue};
    font-size: 1rem;

    transform: translate(-50%, 0);

    transition: color 0.3s, transform 0.3s ease-out;

    &:hover {
        color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
        transform: translate(-50%, -5px);
    }
`;

export const SecondPageContainer = styled.div`
    position: relative;

    min-height: 100vh;
    width: 100%;

    margin-bottom: 140px;
`;

export const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;

    transition: all 0.3s;
`;

export const ModalCard = styled.div`
    justify-content: center;
    align-items: center;
    position: relative;

    width: 500px;
    height: 360px;
    padding: 20px 0;

    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.white};

    & > h1 {
        font-size: 1.4rem;
        font-weight: 500;
        color: ${(props) => props.theme.colors.defaultDarkGrey};

        padding: 0 20px;
    }

    & > div.modal-content {
        display: grid;
        grid-row-gap: 20px;
        grid-column-gap: 10px;
        grid-template-columns: repeat(auto-fill, 216px);

        height: 280px;

        margin-top: 10px;
        padding: 20px;

        overflow-y: scroll;

        ::-webkit-scrollbar-track {
            background-color: ${(props) => props.theme.colors.defaultGrey}66;
            border-radius: 5px;
        }

        ::-webkit-scrollbar {
            width: 5px;
            background-color: ${(props) => props.theme.colors.white};
            border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb {
            background-color: ${(props) =>
                props.theme.colors.defaultHighlightGreyBlue};
            border-radius: 5px;
        }
    }

    &.modal-container-move-in {
        animation-name: modalmovein;
        animation-duration: 0.4s;
        animation-fill-mode: forwards;
        animation-delay: 0s;
    }

    &.modal-container-move-out {
        animation-name: modalmoveout;
        animation-duration: 0.2s;
        animation-fill-mode: forwards;
        animation-delay: 0s;
    }

    @keyframes modalmovein {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }

    @keyframes modalmoveout {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(0);
        }
    }
`;

export const Topic = styled.span`
    font-size: 0.85rem;
    font-weight: 300;
    color: ${(props) => props.theme.colors.defaultDarkGrey};
    cursor: pointer;
    line-height: 1.5rem;

    transition: all 0.2s;

    &:hover {
        color: ${(props) => props.theme.colors.defaultBlue};
    }
`;
