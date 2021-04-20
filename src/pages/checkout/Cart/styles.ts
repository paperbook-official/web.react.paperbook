import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    min-height: 100vh;
    width: 100%;

    background-color: ${(props) => props.theme.colors.background};
`;

export const Content = styled.div`
    position: relative;

    height: 100%;
    width: 80%;

    margin: 60px 10%;
    padding: 20px;

    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.white};

    & > div.divider {
        height: 1px;
        width: 100%;

        margin: 10px 0 20px 0;

        background-color: ${(props) => props.theme.colors.defaultGrey}88;
    }

    @media (max-width: 1400px) {
        width: 84%;
        margin: 60px 8%;
    }

    @media (max-width: 1300px) {
        width: 90%;
        margin: 60px 5%;
    }
`;

export const Title = styled.h1`
    font-size: 1.4rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultDarkBlue};
`;

export const OrderDetailsContainer = styled.div`
    display: flex;
    gap: 40px;
    margin: 0 10px;
`;

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 400px;

    & > .loading-cart {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;

        height: 100%;
    }

    & > .empty-cart {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;

        height: 50%;

        transform: translateY(-70px);

        font-size: 1.4rem;
        color: ${(props) => props.theme.colors.defaultGrey};
    }
`;

export const ProductListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 120px;

    border-bottom: 1px solid ${(props) => props.theme.colors.defaultGrey}88;
`;

export const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    width: 120px;
    height: 100px;

    padding: 10px;

    & > img {
        width: 100%;
        height: 100%;

        object-fit: contain;
        object-position: center;
    }

    &::after {
        content: '';
        position: absolute;
        right: -10px;
        top: 15%;
        height: 70%;
        width: 1px;
        background-color: ${(props) => props.theme.colors.defaultGrey}44;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    width: 40%;
    margin: 20px 40px;

    cursor: pointer;

    & > span {
        font-size: 0.9rem;
        color: ${(props) => props.theme.colors.defaultGrey};
    }
`;

export const ProductTitle = styled.h2`
    font-size: 1.1rem;
    font-weight: 400;
    color: ${(props) => props.theme.colors.defaultDarkGrey};
`;

export const ProductPriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    width: 90px;
    margin: 0 40px;

    font-size: 1.3rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultDarkGrey};

    & > .full-price {
        font-size: 0.9rem;
        font-weight: 400;
        color: ${(props) => props.theme.colors.defaultGrey};
        text-decoration: line-through;
    }
`;

export const DeleteContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 40px;
    width: 40px;
    min-height: 40px;
    min-width: 40px;

    cursor: pointer;
    border-radius: 50px;
    background-color: transparent;

    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.colors.defaultRed}22;
    }
`;

export const OrderResultContainer = styled.div`
    position: relative;
    width: 280px;

    & > div {
        position: absolute;
    }
`;

export const OrderResult = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    gap: 20px;

    width: 280px;
    padding: 10px;

    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.defaultGrey}2D;

    & > h2 {
        font-size: 1.2rem;
        font-weight: 400;
        color: ${(props) => props.theme.colors.defaultDarkBlue};
    }

    & > .shipping-info {
        margin: 15px 10px;
        align-self: flex-start;
    }
`;

export const OrderPriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;

    & > .price-divider {
        height: 1px;
        width: 100%;

        margin: 5px 0;

        background-color: ${(props) => props.theme.colors.defaultGrey};
    }

    & > .installment-price {
        align-self: flex-end;

        font-size: 0.85rem;
        color: ${(props) => props.theme.colors.defaultDarkGrey};
    }

    & > .installment-price.interest-free {
        color: ${(props) => props.theme.colors.defaultLightGreen};
    }
`;

export const OrderResultRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 96%;

    margin: 0 3%;

    color: ${(props) => props.theme.colors.defaultDarkGrey};

    & > .items {
        font-size: 0.85rem;
    }

    & > .items > .item-amount {
        color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
        font-size: 1rem;
        font-weight: 500;
    }

    & > .price {
        color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
        font-weight: 500;
    }

    & > .shipping {
        font-size: 0.85rem;
    }

    & > .shipping-price.free {
        color: ${(props) => props.theme.colors.defaultLightGreen};
        font-weight: 500;
    }

    & > .shipping-price.pending {
        color: ${(props) => props.theme.colors.defaultRed};
        font-weight: 500;
    }

    & > .total-price {
        color: ${(props) => props.theme.colors.defaultBlue};
        font-weight: 500;
    }
`;

export const ContinueButton = styled.button`
    width: 200px;
    height: 40px;

    margin-top: 20px;

    cursor: pointer;
    border: none;
    border-radius: 200px;
    background-color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    outline: none;

    font-size: 1.1rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultLightGrey};

    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.colors.defaultBlue};

        transform: translateY(-3px);
    }

    &:active {
        background-color: ${(props) => props.theme.colors.defaultBlue}AA;
    }

    &.disabled {
        background-color: ${(props) => props.theme.colors.defaultGrey};
        transform: translateY(0);
        cursor: default;
    }
`;

export const BuyMoreButton = styled.button`
    margin-top: -5px;

    cursor: pointer;
    border: none;
    background-color: transparent;
    outline: none;

    color: ${(props) => props.theme.colors.defaultGrey};
    font-size: 0.9rem;

    transition: all 0.3s;

    &:hover {
        color: ${(props) => props.theme.colors.defaultDarkBlue};
        font-size: 0.91rem;
    }

    &:active {
        opacity: 0.8;
    }
`;
