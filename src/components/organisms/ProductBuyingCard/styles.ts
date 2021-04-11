import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;

    height: auto;
    width: 320px;
    padding: 20px;

    border: 1px solid ${(props) => props.theme.colors.defaultGrey}44;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.white};
`;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > span.rating {
        display: flex;
        flex-direction: row;
    }
`;

export const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DiscountContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Title = styled.span`
    font-size: 1.3rem;
`;

export const RatingAmount = styled.span`
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.defaultGrey};

    margin-left: 10px;

    transform: translateY(1px);
`;

export const Price = styled.span`
    font-weight: 500;
    font-size: 1.6rem;
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

    margin-left: 12px;
`;

export const InstallmentPrice = styled.span`
    &.interest-free {
        color: ${(props) => props.theme.colors.defaultLightGreen};
    }
`;

export const ShippingArriveDate = styled.span`
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.defaultDarkGrey};
    margin-left: 6px;

    &.shipping-free {
        color: ${(props) => props.theme.colors.defaultLightGreen};
    }
`;

export const ShippingOption = styled.span`
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    cursor: pointer;

    margin-left: 6px;

    &:hover {
        color: ${(props) => props.theme.colors.defaultBlue};
    }

    &.more-options {
        font-size: 0.8rem;
        margin-left: 8px;
    }
`;

export const SellerContainer = styled.span`
    font-size: 0.85rem;
    color: ${(props) => props.theme.colors.defaultMidGrey};

    & > span.seller {
        font-size: 0.85rem;
        color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
        cursor: pointer;
    }

    & > span.seller:hover {
        color: ${(props) => props.theme.colors.defaultBlue};
    }
`;

export const ShippingContainer = styled.div`
    display: flex;
`;

export const ActionButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

export const ActionButton = styled.button`
    width: 240px;
    height: 50px;

    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 150px;
    background-color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};

    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultLightGrey};

    transition: all 0.3s;

    &:hover {
        background-color: ${(props) =>
            props.theme.colors.defaultHighlightGreyBlue}DD;
    }

    &.secondary {
        background-color: ${(props) =>
            props.theme.colors.defaultHighlightGreyBlue}66;
        color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    }

    &.secondary:hover {
        background-color: ${(props) =>
            props.theme.colors.defaultHighlightGreyBlue}4D;
    }
`;
