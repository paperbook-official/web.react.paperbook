import React, { useState } from 'react';

import { ProductProxy } from '../../../models/proxies/product';

import Rating from '../../../components/atoms/Rating';

import { formatPrice } from '../../../utils/formatters';

import {
    Container,
    Discount,
    ImageContainer,
    InfoContainer,
    Installment,
    Price,
    PriceContainer,
    Seller,
    Title
} from './styles';

interface ProductCardProps {
    product: ProductProxy;
    rating?: number;
    onClick(product: ProductProxy): void;
    style?: React.CSSProperties;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    rating = 0,
    onClick,
    style
}: ProductCardProps): JSX.Element => {
    const [currentPrice] = useState(product.price * (1 - product.discount));
    const [currentInstallmentPrice] = useState(
        !product.installmentPrice || product.installmentPrice <= product.price
            ? currentPrice
            : product.installmentPrice * (1 - product.discount)
    );
    const [hasDiscount] = useState(product.discount > 0);
    const [hasInstallment] = useState(product.installmentAmount > 1);
    const [isInterestFree] = useState(currentPrice >= currentInstallmentPrice);

    const getInstallment = (): number => {
        return currentInstallmentPrice / product.installmentAmount;
    };

    return (
        <Container style={style} onClick={() => onClick(product)}>
            <ImageContainer>
                <img src={product.imageUrl} alt="Product Image" />
            </ImageContainer>
            <InfoContainer>
                <PriceContainer>
                    {hasDiscount && (
                        <Price className="full-price">
                            R$ {formatPrice(product.price)}
                        </Price>
                    )}
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: hasInstallment ? -5 : 0
                        }}
                    >
                        <Price>R$ {formatPrice(currentPrice)}</Price>
                        {hasDiscount && (
                            <Discount>%{product.discount * 100} OFF</Discount>
                        )}
                    </span>
                    {hasInstallment && (
                        <span style={{ fontSize: '0.9rem' }}>
                            em{' '}
                            <Installment isInterestFree={isInterestFree}>
                                {product.installmentAmount}x R${' '}
                                {formatPrice(getInstallment())}{' '}
                                {isInterestFree && 'sem juros'}
                            </Installment>
                        </span>
                    )}
                </PriceContainer>
                <div>
                    <Title>{product.name}</Title>
                    <Seller>por {product.user.name}</Seller>
                </div>
                <div style={{ width: 70 }}>
                    <Rating size={13} rating={rating} />
                </div>
            </InfoContainer>
        </Container>
    );
};

export default ProductCard;
