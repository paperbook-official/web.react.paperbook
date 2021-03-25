import React, { useEffect, useState } from 'react';

import { ProductProxy } from '../../../models/proxies/product';

import { useTheme } from 'styled-components';

import { formatPrice } from '../../../utils/formatters';

import LoadingDots from '../../atoms/LoadingDots';
import {
    Container,
    ImageContainer,
    InfoContainer,
    Price,
    Title
} from './styles';

interface CustomProductCardProps {
    isLoading?: boolean;
    product?: ProductProxy;
    onClick(product: ProductProxy): void;
    style?: React.CSSProperties;
}

const CustomProductCard: React.FC<CustomProductCardProps> = ({
    isLoading = false,
    product,
    onClick,
    style
}: CustomProductCardProps) => {
    const [currentPrice, setCurrentPrice] = useState(0);
    const [hasDiscount, setHasDiscount] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        if (product) {
            setCurrentPrice(product.price * (1 - product.discount));
            setHasDiscount(product?.discount > 0);
        }
    }, [product]);

    return (
        <Container
            style={style}
            isLoading={isLoading}
            onClick={() => product && onClick(product)}
        >
            {isLoading && <LoadingDots color={theme.colors.defaultLightGrey} />}
            {!isLoading && product && (
                <>
                    {' '}
                    <InfoContainer>
                        <Title>{product.name}</Title>
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            {hasDiscount && (
                                <Price className="full-price">
                                    R$ {formatPrice(product.price)}
                                </Price>
                            )}
                            <Price>R$ {formatPrice(currentPrice)}</Price>
                        </div>
                    </InfoContainer>
                    <ImageContainer>
                        <img src={product.imageUrl} alt="Product Image" />
                    </ImageContainer>{' '}
                </>
            )}
        </Container>
    );
};

export default CustomProductCard;
