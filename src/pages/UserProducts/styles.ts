import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;
    width: 100%;

    background-color: ${(props) => props.theme.colors.background};

    & div.title-container {
        display: flex;
        flex-direction: column;

        margin-left: 10px;
    }

    & h1.title {
        color: ${(props) => props.theme.colors.defaultDarkGrey};
        font-size: 1.6rem;
        font-weight: 500;
    }

    & span.total-matches {
        color: ${(props) => props.theme.colors.defaultGrey};
        font-size: 0.9rem;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    margin: 40px 9%;
    margin-bottom: 0;
    padding-bottom: 140px;

    min-height: calc(100vh - 120px);

    @media (max-width: 1400px) {
        margin: 40px 7%;
        margin-bottom: 0;
    }

    @media (max-width: 1100px) {
        margin: 40px 3%;
        margin-bottom: 0;
    }
`;

export const ListContainer = styled.div`
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 40px;
    grid-template-columns: repeat(auto-fill, 300px);

    justify-content: space-between;

    position: relative;
    flex-grow: 1;

    width: 100%;

    margin-top: 20px;

    @media (max-width: 665px) {
        grid-column-gap: 5px;
        grid-template-columns: repeat(auto-fill, 255px);
    }

    @media (max-width: 1000px) {
        grid-column-gap: 20px;
    }

    @media (max-width: 1100px) and (min-width: 845px) {
        grid-template-columns: repeat(auto-fill, 255px);
    }

    @media (max-width: 1200px) {
        grid-column-gap: 5px;
    }

    @media (max-width: 1366px) and (min-width: 1201px) {
        grid-column-gap: 10px;
        grid-template-columns: repeat(auto-fill, 255px);
    }
`;

export const ResultNotFound = styled.span`
    font-size: 1.3rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultGrey};

    margin-left: 50%;
    margin-top: 10px;
    transform: translateX(-50%);
`;
