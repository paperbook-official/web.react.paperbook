import styled, { DefaultTheme } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    height: 425px;
    width: 255px;

    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    background-color: white;
    cursor: pointer;

    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.colors.defaultLightGrey};
        transform: scale(0.96);
    }

    &:active {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
        transform: scale(0.93);
    }
`;

export const ImageContainer = styled.div`
    height: 60%;
    padding: 16px;

    border-bottom: 1px solid
        ${(props) => (props.theme.title === 'light' ? '#DDDDDD' : '#777777')};

    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 40%;
    padding: 10px 20px;
    gap: 10px;
`;

export const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Price = styled.span`
    font-weight: 500;
    font-size: 1.05rem;
    color: ${(props) => props.theme.colors.defaultDarkGrey};

    &.full-price {
        margin-bottom: -5px;
        font-weight: 400;
        font-size: 0.8rem;
        color: ${(props) => props.theme.colors.defaultGrey};
        text-decoration: line-through;
    }
`;

export const Discount = styled.span`
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.defaultLightGreen};

    margin-left: 8px;
`;

export const Installment = styled.span`
    font-size: 0.9rem;
    color: ${(props: { isInterestFree: boolean; theme: DefaultTheme }) =>
        props.isInterestFree
            ? props.theme.colors.defaultLightGreen
            : props.theme.colors.defaultDarkerGrey};
`;

export const Title = styled.p`
    font-size: 0.85rem;
    line-height: 1rem;
    color: ${(props) => props.theme.colors.defaultDarkGrey};
`;

export const Seller = styled.span`
    font-size: 0.85rem;
    color: ${(props) => props.theme.colors.defaultGrey};
`;
