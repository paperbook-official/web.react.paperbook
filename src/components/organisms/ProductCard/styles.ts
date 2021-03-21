import styled, { DefaultTheme } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    height: 480px;
    max-height: 500px;
    width: 300px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    background-color: white;
    cursor: pointer;

    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.colors.defaultLightGrey};
        transform: scale(1.03);
    }

    &:active {
        box-shadow: none;
        transform: scale(1.02);
    }
`;

export const ImageContainer = styled.div`
    height: 60%;
    padding: 18px;

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
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.defaultDarkGrey};

    &.full-price {
        margin-bottom: -5px;
        font-weight: 400;
        font-size: 0.9rem;
        color: ${(props) => props.theme.colors.defaultGrey};
        text-decoration: line-through;
    }
`;

export const Discount = styled.span`
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.defaultLightGreen};

    margin-left: 10px;
`;

export const Installment = styled.span`
    font-size: 1rem;
    color: ${(props: { isInterestFree: boolean; theme: DefaultTheme }) =>
        props.isInterestFree
            ? props.theme.colors.defaultLightGreen
            : props.theme.colors.defaultDarkerGrey};
`;

export const Title = styled.p`
    font-size: 1rem;
    line-height: 1.3125rem;
    color: ${(props) => props.theme.colors.defaultDarkGrey};
`;

export const Seller = styled.span`
    font-size: 1rem;
    color: ${(props) => props.theme.colors.defaultGrey};
`;
