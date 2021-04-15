import React, { useState } from 'react';

import { CEPProxy } from '../../../models/proxies/cep/cep';
import { ProductProxy } from '../../../models/proxies/product/product';
import { ProductReviewProxy } from '../../../models/proxies/product/productReview';

import { ShippingOptionData } from '../../../contexts/shippingContext';

import { useTheme } from 'styled-components';

import { formatPrice } from '../../../utils/formatters';

import AmountPicker from '../../atoms/AmountPicker';
import Rating from '../../atoms/Rating';
import ShippingInfo from '../../atoms/ShippingInfo';
import {
    ActionButton,
    ActionButtonContainer,
    Container,
    Discount,
    DiscountContainer,
    HeaderContainer,
    InstallmentPrice,
    Price,
    PriceContainer,
    RatingAmount,
    SellerContainer,
    Title
} from './styles';

interface ProductBuyingCardProps {
    product: ProductProxy;
    review?: ProductReviewProxy;
    cep?: CEPProxy;
    shippingOption?: ShippingOptionData;
    onShippingOptionsClick(): void;
    onBuyClick(product: ProductProxy): void;
    onAddCartClick(product: ProductProxy): void;
    onAmountChange(amount: number): void;
}

const ProductBuyingCard: React.FC<ProductBuyingCardProps> = ({
    product,
    cep,
    shippingOption,
    onShippingOptionsClick,
    onBuyClick,
    onAddCartClick,
    onAmountChange,
    review
}: ProductBuyingCardProps): JSX.Element => {
    const theme = useTheme();

    const [buyAmount, setBuyAmount] = useState(1);

    const hasDiscount = product.discount > 0;
    const currentPrice = product.price * (1 - product.discount);
    const isInterestFree =
        product.installmentPrice === null ||
        product.installmentPrice * (1 - product.discount) <= currentPrice;

    const handleAmountChange = (amount: number): void => {
        setBuyAmount(amount);
        onAmountChange(amount);
    };

    return (
        <Container>
            <HeaderContainer>
                <Title>{product.name}</Title>
                <span className="rating">
                    <Rating
                        rating={Math.round(review?.average || 0)}
                        size={16}
                    />
                    {review && review.total > 0 && (
                        <RatingAmount>{review.total}</RatingAmount>
                    )}
                </span>
            </HeaderContainer>

            <PriceContainer>
                {hasDiscount && (
                    <Price className="full-price">
                        R$ {formatPrice(product.price)}
                    </Price>
                )}
                <DiscountContainer>
                    <Price>R$ {formatPrice(currentPrice)}</Price>
                    {hasDiscount && (
                        <Discount>{`${product.discount * 100}% OFF`}</Discount>
                    )}
                </DiscountContainer>
                {product.installmentAmount > 1 && (
                    <span
                        style={{
                            fontSize: '0.9rem',
                            marginTop: -5,
                            color: theme.colors.defaultMidGrey
                        }}
                    >
                        em{' '}
                        <InstallmentPrice
                            className={isInterestFree ? 'interest-free' : ''}
                        >
                            {`${product.installmentAmount}x R$ ${formatPrice(
                                currentPrice / product.installmentAmount
                            )} ${isInterestFree ? 'sem juros' : ''}`}
                        </InstallmentPrice>
                    </span>
                )}
            </PriceContainer>

            <ShippingInfo
                onShippingOptionsClick={onShippingOptionsClick}
                cep={cep}
                option={shippingOption}
            />

            <SellerContainer>
                Vendedor <span className="seller">{product.user?.name}</span>
            </SellerContainer>

            <AmountPicker
                initialAmount={buyAmount}
                onAmountChange={handleAmountChange}
                stockAmount={product.stockAmount}
            />

            <ActionButtonContainer>
                <ActionButton onClick={() => product && onBuyClick(product)}>
                    Comprar
                </ActionButton>
                <ActionButton
                    className="secondary"
                    onClick={() => product && onAddCartClick(product)}
                >
                    Adicionar ao Carrinho
                </ActionButton>
            </ActionButtonContainer>
        </Container>
    );
};

export default ProductBuyingCard;
