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

    margin: 40px 10%;
    padding-bottom: 70px;

    @media (max-width: 1300px) {
        margin: 40px 1%;
    }

    @media (max-width: 1400px) {
        margin: 40px 7%;
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
`;

export const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 1;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;

    column-gap: 10px;
    row-gap: 40px;
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
