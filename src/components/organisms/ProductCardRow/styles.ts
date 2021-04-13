import styled, { DefaultTheme } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;

    height: 225px;
    width: auto;

    border-bottom: 1px solid ${(props) => props.theme.colors.defaultGrey}77;
    background-color: white;
    cursor: pointer;

    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.colors.white}AA;
    }
`;

export const ImageContainer = styled.div`
    height: 100%;
    width: 200px;
    padding: 20px;

    & div.logo-icon {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
    }

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
    padding: 20px 20px 20px 0;
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
        font-size: 1rem;
        color: ${(props) => props.theme.colors.defaultGrey};
        text-decoration: line-through;
    }
`;

export const Discount = styled.span`
    font-size: 1rem;
    color: ${(props) => props.theme.colors.defaultLightGreen};

    margin-left: 8px;
`;

export const Installment = styled.span`
    font-size: 1.05rem;
    color: ${(props: { isInterestFree: boolean; theme: DefaultTheme }) =>
        props.isInterestFree
            ? props.theme.colors.defaultLightGreen
            : props.theme.colors.defaultDarkerGrey};
`;

export const Title = styled.p`
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: ${(props) => props.theme.colors.defaultDarkGrey};
`;

export const Seller = styled.span`
    font-size: 0.85rem;
    color: ${(props) => props.theme.colors.defaultGrey};
`;
