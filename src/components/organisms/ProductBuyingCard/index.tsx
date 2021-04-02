import React, { useState } from 'react';

import { CEPProxy } from '../../../models/proxies/address';
import { ProductProxy } from '../../../models/proxies/product';

import { formatPrice } from '../../../utils/formatters';

import Rating from '../../atoms/Rating';
import {
    Container,
    StyledContainer,
    DescontoContainer,
    Title,
    Price,
    CurrentPrice,
    Discount,
    CaminhaozinhoIcon,
    InterestFree,
    ShippingArriveDate,
    ShippingOption,
    Seller,
    Amount,
    Text,
    StockAmount,
    CreateButton,
    AddToCartButton
} from './styles';

interface ProductBuyingCardProps {
    product: ProductProxy;
    cep: CEPProxy;
    shippingOption: number;
    onShippingOptionsClick(): void;
    onBuyClick(product: ProductProxy): void;
    onAddCartClick(product: ProductProxy): void;
}

const ProductBuyingCard: React.FC<ProductBuyingCardProps> = ({
    product,
    cep,
    shippingOption,
    onShippingOptionsClick,
    onBuyClick,
    onAddCartClick
}: ProductBuyingCardProps): JSX.Element => {
    const [buyAmount, setBuyAmount] = useState(1);

    const [hasDiscount] = useState(product.discount > 0);
    const currentPrice = product.price * (1 - product.discount);

    const changeBuyAmount = (amount: number): void => {
        setBuyAmount(amount);
    };

    return (
        <Container>
            <StyledContainer>
                <Title>{product.name}</Title>
                <Rating rating={5} />
            </StyledContainer>

            <StyledContainer>
                {!hasDiscount && <Price>{formatPrice(product.price)}</Price>}
                <DescontoContainer>
                    <CurrentPrice>{formatPrice(currentPrice)}</CurrentPrice>
                    {!hasDiscount && (
                        <Discount>{`${product.discount * 100}% OFF`}</Discount>
                    )}
                </DescontoContainer>
                {!(product.installmentAmount > 1) && (
                    <InterestFree>{`em ${product.installmentAmount}x R$ ${
                        product.installmentPrice
                    } ${
                        product.installmentPrice < currentPrice
                            ? 'sem juros'
                            : ''
                    }`}</InterestFree>
                )}
            </StyledContainer>

            <StyledContainer>
                <CaminhaozinhoIcon>CAMINHAO</CaminhaozinhoIcon>
                <ShippingArriveDate>{`Chegará gratis 15/03`}</ShippingArriveDate>
                <ShippingOption onClick={onShippingOptionsClick} />
            </StyledContainer>

            <Seller>{`Vendedor ${product.user}`}</Seller>

            <StyledContainer>
                <Text>Quantidade </Text>
                <Amount
                    type={'number'}
                    min={buyAmount}
                    max={product.stockAmount}
                    value={buyAmount}
                    onChange={(event) =>
                        changeBuyAmount(parseInt(event.target.value, 10))
                    }
                />
                <StockAmount>{product.stockAmount} disponível</StockAmount>
            </StyledContainer>

            <StyledContainer>
                <CreateButton onClick={() => product && onBuyClick(product)} />
                <AddToCartButton
                    onClick={() => product && onAddCartClick(product)}
                />
            </StyledContainer>
        </Container>
    );
};

export default ProductBuyingCard;
