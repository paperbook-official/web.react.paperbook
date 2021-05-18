import styled from 'styled-components';

import { ReactComponent as RateSVG } from '../../../assets/icons/rate.svg';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    height: auto;
    width: 100%;

    & > div.product-list-${(props: { orderId: number }) => props.orderId} {
        width: 100%;
        height: 0;
        overflow: hidden;

        transform-origin: bottom center;

        transition: all 0.3s ease;
    }

    &
        > div.product-list-${(props: { orderId: number }) =>
            props.orderId}.active {
        height: ${(props: { orderId: number; productAmount: number }) =>
            props.productAmount * 160}px;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;
    height: 200px;

    padding: 20px;
    z-index: 5;

    background-color: ${(props) => props.theme.colors.white};
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 #0004;
    cursor: pointer;

    transition: transform 0.3s ease, background-color 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.colors.defaultLightGrey};
    }

    &:not(.active):hover {
        transform: translateY(-10px);
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > div.address,
    & > div.order-price {
        display: flex;
        flex-direction: column;
    }
`;

export const Title = styled.h1`
    color: ${(props) => props.theme.colors.defaultDarkGrey};
    font-size: 1.2rem;
    font-weight: normal;
`;

export const AddressInfo = styled.span`
    color: ${(props) => props.theme.colors.defaultDarkGrey};
`;

export const InstallmentPrice = styled.span`
    color: ${(props) => props.theme.colors.defaultDarkGrey};
    font-size: 1rem;

    &.interest-free {
        color: ${(props) => props.theme.colors.defaultLightGreen};
    }
`;

export const Price = styled.span`
    color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    font-size: 1.2rem;
`;

export const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    & > div.second {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    & > div.actions-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
    }
`;

export const StatusContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;

    & > span.status {
        font-size: 1.1rem;
    }
`;

export const TrackingCode = styled.span`
    color: ${(props) => props.theme.colors.defaultGrey};
    font-size: 1.1rem;
`;

export const Date = styled.span`
    color: ${(props) => props.theme.colors.defaultDarkGrey};
    font-size: 0.9rem;
`;

export const ProductGroupCard = styled.div`
    display: flex;
    flex-direction: row;

    position: relative;

    height: 160px;
    width: 98%;
    margin: 0 1%;

    padding: 20px;
    z-index: 0;

    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.defaultGrey}77;
    border-top: none;

    & > div.info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
        flex-grow: 1;
    }

    &:last-child {
        border-radius: 0 0 5px 5px;
    }

    & span.product-amount-number {
        color: ${(props) => props.theme.colors.defaultBlue};
        font-weight: 500;
        font-size: 1.1rem;

        margin-left: 10px;
    }
`;

export const ImageContainer = styled.div`
    height: 100%;
    width: 140px;
    padding-right: 20px;

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

export const Seller = styled.span`
    color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    cursor: pointer;

    &:hover {
        color: ${(props) => props.theme.colors.defaultBlue};
    }
`;

export const RateIcon = styled(RateSVG)`
    height: 24px;
    width: 24px;

    margin-top: 2px;

    color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    cursor: pointer;

    transition: all 0.3s;

    &:hover {
        color: ${(props) => props.theme.colors.defaultBlue};
    }
`;
