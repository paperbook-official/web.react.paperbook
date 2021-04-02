import styled, { DefaultTheme } from 'styled-components';

export const Container = styled.div`
    display: flex;
    position: absolute;
    top: 80%;
    right: 25%;

    height: 210px;
    width: 320px;
    padding: 10px 20px;
`;
export const StyledContainer = styled.div`
    display: flex;
`;
export const DescontoContainer = styled.div`
    display: flex;
`;

export const Title = styled.span``;
//ft Rating

export const Price = styled.span``;
export const CurrentPrice = styled.span``;
export const Discount = styled.span``;
export const InterestFree = styled.span``;

export const ShippingArriveDate = styled.span``;
export const ShippingOption = styled.span``;

export const Seller = styled.span``;
export const Amount = styled.input``;
export const StockAmount = styled.span``;

export const CreateButton = styled.div`
    border-radius: 15px;
    background-color: ${(props) => props.theme.colors.defaultDarkBlue}99;
`;
export const AddToCartButton = styled.div`
    border-radius: 15px;
    background-color: ${(props) => props.theme.colors.defaultDarkBlue}99;
`;

export const CaminhaozinhoIcon = styled.div`
    background-color: green;
`;

export const Text = styled.span``;
