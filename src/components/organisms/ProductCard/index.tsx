import React, { useEffect, useState } from 'react';

import { ProductProxy } from '../../../models/proxies/product/product';

import Rating from '../../../components/atoms/Rating';
import { useTheme } from 'styled-components';

import { formatPrice } from '../../../utils/formatters';

import Logo from '../../atoms/Logo';
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
    const theme = useTheme();

    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentInstallmentPrice, setCurrentInstallmentPrice] = useState(0);
    const [hasDiscount, setHasDiscount] = useState(false);
    const [hasInstallment, setHasInstallment] = useState(false);
    const [isInterestFree, setInterestFree] = useState(false);

    const initialState = async (): Promise<void> => {
        const current = product.price * (1 - product.discount);
        const currentInst =
            !product.installmentPrice ||
            product.installmentPrice <= product.price
                ? current
                : product.installmentPrice * (1 - product.discount);
        setCurrentPrice(current);
        setCurrentInstallmentPrice(currentInst);
        setHasDiscount(product.discount > 0);
        setHasInstallment(product.installmentAmount > 1);
        setInterestFree(current >= currentInst);
    };

    useEffect(() => {
        initialState();
    }, []);

    useEffect(() => {
        initialState();
    }, [product]);

    const getInstallment = (): number => {
        return currentInstallmentPrice / product.installmentAmount;
    };

    return (
        <Container style={style} onClick={() => onClick(product)}>
            <ImageContainer>
                {product.imageUrl && product.imageUrl !== '' ? (
                    <img src={product.imageUrl} alt="Product Image" />
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
                <div>
                    <Title>{product.name}</Title>
                    <Seller>por {product.user?.name}</Seller>
                </div>
                <div style={{ width: 70 }}>
                    <Rating size={13} rating={rating} />
                </div>
            </InfoContainer>
        </Container>
    );
};

export default ProductCard;
