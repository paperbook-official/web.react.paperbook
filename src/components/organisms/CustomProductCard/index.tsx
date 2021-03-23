import React, { useState } from 'react';

import { ProductProxy } from '../../../models/proxies/product';

import { formatPrice } from '../../../utils/formatters';

import {
    Container,
    ImageContainer,
    InfoContainer,
    Price,
    Title
} from './styles';

interface CustomProductCardProps {
    product: ProductProxy;
    image: string;
    onClick(product: ProductProxy): void;
    style?: React.CSSProperties;
}

const CustomProductCard: React.FC<CustomProductCardProps> = ({
    product,
    image,
    onClick,
    style
}: CustomProductCardProps) => {
    const [currentPrice] = useState(
        product.fullPrice * (1 - product.discountAmount)
    );
    const [hasDiscount] = useState(product.discountAmount > 0);

    return (
        <Container style={style} onClick={() => onClick(product)}>
            <InfoContainer>
                <Title>{product.name}</Title>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {hasDiscount && (
                        <Price className="full-price">
                            R$ {formatPrice(product.fullPrice)}
                        </Price>
                    )}
                    <Price>R$ {formatPrice(currentPrice)}</Price>
                </div>
            </InfoContainer>
            <ImageContainer>
                <img src={image} alt="Product Image" />
            </ImageContainer>
        </Container>
    );
};

export default CustomProductCard;
