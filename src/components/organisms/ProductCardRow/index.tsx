import React, { useState } from 'react';

import { ProductProxy } from '../../../models/proxies/product/product';

import { useTheme } from 'styled-components';

import { formatPrice } from '../../../utils/formatters';

import Logo from '../../atoms/Logo';
import Rating from '../../atoms/Rating';
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

interface ProductCardRowProps {
    product: ProductProxy;
    rating?: number;
    onClick(product: ProductProxy): void;
    style?: React.CSSProperties;
}

const ProductCardRow: React.FC<ProductCardRowProps> = ({
    product,
    rating = 0,
    onClick,
    style
}: ProductCardRowProps): JSX.Element => {
    const theme = useTheme();

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
                {product.imageUrl && product.imageUrl !== '' ? (
                    <img
                        src={
                            product.imageUrl ||
                            'https://images-na.ssl-images-amazon.com/images/I/61hH5E8xHZL.jpg'
                        }
                        alt="Product Image"
                    />
                ) : (
                    <div className="logo-icon">
                        <Logo
                            showTitle={false}
                            color={theme.colors.defaultGrey + '88'}
                            size={100}
                        />
                    </div>
                )}
            </ImageContainer>
            <InfoContainer>
                <div>
                    <Title>{product.name}</Title>
                    <Seller>Vendido por {product.user?.name}</Seller>
                </div>
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
                            <Discount>{product.discount * 100}% OFF</Discount>
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
                <div style={{ width: 70, position: 'absolute', bottom: 20 }}>
                    <Rating size={13} rating={rating} />
                </div>
            </InfoContainer>
        </Container>
    );
};

export default ProductCardRow;
