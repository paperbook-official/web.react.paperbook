import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
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
