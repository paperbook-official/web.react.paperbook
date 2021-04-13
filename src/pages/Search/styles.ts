import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    min-height: 100vh;
    width: 100%;

    background-color: ${(props) => props.theme.colors.background};
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;

    margin: 40px 9%;
    margin-bottom: 0;
    padding-bottom: 140px;

    @media (max-width: 1400px) {
        margin: 40px 7%;
        margin-bottom: 0;
    }

    @media (max-width: 1100px) {
        margin: 40px 3%;
        margin-bottom: 0;
    }
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

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    width: 300px;
    margin-top: 20px;
`;

export const Title = styled.span`
    font-size: 1.6rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultDarkerGrey};
`;

export const TotalMatches = styled.span`
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.defaultGrey};
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    width: 300px;

    @media (max-width: 1150px) {
        width: 250px;
    }
`;

export const ListContainer = styled.div`
    display: ${(props: { isListDisplay: boolean }) =>
        props.isListDisplay ? 'flex' : 'grid'};
    grid-column-gap: 30px;
    grid-row-gap: ${(props: { isListDisplay: boolean }) =>
        props.isListDisplay ? 0 : 40}px;
    grid-template-columns: repeat(auto-fill, 300px);

    flex-direction: column;
    position: relative;

    flex-grow: 1;
    margin-top: 120px;

    @media (max-width: 1000px) {
        grid-column-gap: 20px;
    }

    @media (max-width: 1366px) {
        grid-template-columns: repeat(auto-fill, 255px);
    }
`;

export const SwitchIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: -60px;
    right: 20px;

    height: 24px;
    width: 30px;
    padding: 2px 5px;

    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.defaultGrey};

    &.list {
        right: 49px;
        border-radius: 5px 0 0 5px;
    }

    &.grid {
        border-radius: 0 5px 5px 0;
    }

    &.selected {
        border-color: ${(props) => props.theme.colors.defaultBlue};
        border-width: 2px;
    }
`;

export const TopicsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    margin-top: 30px;

    & .topic-title {
        font-weight: 500;
        font-size: 1.1rem;
        color: ${(props) => props.theme.colors.defaultDarkerGrey};
        margin-bottom: 10px;
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

export const ResultNotFound = styled.span`
    font-size: 1.3rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultGrey};

    margin-left: 45%;
    margin-top: 10px;
    transform: translateX(-50%);
`;

export const PriceRangeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-top: 5px;
`;

export const PriceFieldContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const PriceFieldLabel = styled.span`
    position: absolute;
    color: ${(props) => props.theme.colors.defaultGrey}AA;
    font-size: 0.9rem;
    pointer-events: none;

    transition: all 0.3s;
`;

export const PriceField = styled.input`
    width: 70px;
    height: 28px;

    font-size: 0.9rem;
    text-align: center;
    color: ${(props) => props.theme.colors.defaultDarkGrey};

    outline: none;
    border: 1px solid ${(props) => props.theme.colors.defaultGrey}77;
    border-radius: 5px;

    transition: all 0.3s;

    &:focus {
        border-color: ${(props) => props.theme.colors.defaultBlue};
    }

    &:focus ~ ${PriceFieldLabel}, &:valid ~ ${PriceFieldLabel} {
        opacity: 0;
    }
`;

export const Divider = styled.div`
    width: 10px;
    height: 1px;
    margin: 0 10px;

    background-color: ${(props) => props.theme.colors.defaultGrey}AA;
`;

export const PriceButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 24px;
    margin-left: 10px;

    cursor: ${(props) => (props.disabled ? '' : 'pointer')};
    background-color: ${(props) =>
        props.disabled
            ? props.theme.colors.defaultGrey
            : props.theme.colors.defaultHighlightGreyBlue};
    color: ${(props) => props.theme.colors.defaultLightGrey};
    border: none;
    border-radius: 5px;
    outline: none;

    transition: all 0.3s;

    &:hover {
        background-color: ${(props) =>
            props.disabled
                ? props.theme.colors.defaultGrey
                : props.theme.colors.defaultBlue};
    }
`;
