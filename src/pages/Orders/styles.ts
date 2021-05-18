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

    min-height: calc(100vh - 120px);

    margin: 40px 9%;
    margin-bottom: 0;
    padding-bottom: 100px;

    @media (max-width: 1400px) {
        margin: 40px 7%;
        margin-bottom: 0;
    }

    @media (max-width: 1100px) {
        margin: 40px 3%;
        margin-bottom: 0;
    }
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    position: absolute;
    top: -90px;
    left: 0;

    width: 300px;
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

    width: 240px;

    @media (max-width: 1150px) {
        width: 220px;
    }
`;

export const ListContainer = styled.div`
    display: flex;
    gap: 40px;

    flex-direction: column;
    position: relative;

    flex-grow: 1;
    margin-top: 120px;
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

    &.active {
        color: ${(props) => props.theme.colors.defaultBlue};
        font-weight: 500;
    }

    &:hover {
        color: ${(props) => props.theme.colors.defaultBlue};
    }
`;

export const ResultNotFound = styled.span`
    position: absolute;
    top: 60px;
    left: 50%;

    font-size: 1.3rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultGrey};

    transform: translateX(-50%);
`;

export const CepContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    margin-top: 5px;
`;

export const CepInputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CepInputLabel = styled.span`
    position: absolute;
    color: ${(props) => props.theme.colors.defaultGrey}AA;
    font-size: 0.9rem;
    pointer-events: none;

    transition: all 0.3s;
`;

export const CepInput = styled.input`
    width: 120px;
    height: 30px;

    outline: none;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.colors.defaultGrey}88;

    color: ${(props) => props.theme.colors.defaultDarkBlue};
    text-align: center;

    &:focus ~ ${CepInputLabel}, &:valid ~ ${CepInputLabel} {
        opacity: 0;
    }
`;

export const CepButton = styled.button`
    width: 40px;
    height: 24px;

    outline: none;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.defaultDarkBlue};
    cursor: pointer;

    color: ${(props) => props.theme.colors.white};

    transition: all 0.3s;

    &:hover {
        background-color: ${(props) =>
            props.theme.colors.defaultHighlightGreyBlue};
    }
`;

export const RateContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;

    width: 600px;
    height: 400px;

    padding: 10px 20px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.white};

    & > h1.rate-title {
        font-size: 1.4rem;
        font-weight: 500;
        color: ${(props) => props.theme.colors.defaultDarkGrey};
    }

    &.loading {
        justify-content: center;
        align-items: center;
    }
`;

export const RateSelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;

    & > h1.rate-select-title {
        color: ${(props) => props.theme.colors.defaultDarkGrey}CC;
        font-weight: 500;
    }
`;

export const RateTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    & > h1.rate-text-title {
        color: ${(props) => props.theme.colors.defaultDarkGrey}CC;
        font-weight: 500;
    }

    & > textarea {
        height: 160px;
        padding: 5px 10px;
        resize: none;
        border-radius: 5px;
        border: 1px solid ${(props) => props.theme.colors.defaultGrey};
    }
`;

export const RateButton = styled.button`
    align-self: flex-end;

    margin-top: -20px;
    padding: 5px 10px;

    background-color: transparent;
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;

    color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    font-size: 1.1rem;

    transition: all 0.3s;

    &:hover {
        color: ${(props) => props.theme.colors.defaultBlue};
        background-color: ${(props) =>
            props.theme.colors.defaultHighlightGreyBlue}22;
    }

    &.disabled {
        color: ${(props) => props.theme.colors.defaultGrey};
        cursor: default;
        background-color: transparent;
    }
`;
