import React, { useState } from 'react';

import { ProductProxy } from '../../../models/proxies/product';
import { UserProxy } from '../../../models/proxies/user';

import Rating from '../../../components/atoms/Rating';

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
    image: string;
    title: string;
    seller: string;
    fullPrice: number;
    installmentPrice: number;
    installmentAmount: number;
    stockAmount: number;
    discountAmount?: number;
    rating?: number;
    onClick(product: ProductProxy): void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    image,
    title,
    seller,
    fullPrice,
    installmentPrice,
    installmentAmount,
    stockAmount,
    discountAmount = 0,
    rating = 0,
    onClick
}: ProductCardProps): JSX.Element => {
    const [currentPrice] = useState(fullPrice * (1 - discountAmount));
    const [currentInstallmentPrice] = useState(
        installmentPrice * (1 - discountAmount)
    );
    const [hasDiscount] = useState(discountAmount > 0);
    const [hasInstallment] = useState(installmentAmount > 1);
    const [isInterestFree] = useState(currentPrice === currentInstallmentPrice);

    const getInstallment = (): number => {
        return currentInstallmentPrice / installmentAmount;
    };

    const formatPrice = (price: number): string => {
        return price.toFixed(2).replace(/\./, ',');
    };

    // TODO - remove hardcoded user
    const user: UserProxy = {
        id: 3,
        createdAt: '2021-03-17T02:01:03.708Z',
        updatedAt: '2021-03-17T02:01:03.708Z',
        isActive: true,
        name: 'usuario',
        lastName: 'vendedor',
        email: 'seller@email.com',
        cpf: '12345678910',
        permissions: 'seller',
        phone: '15988776655',
        addresses: []
    };

    // TODO - remove hardcoded product
    const product = {
        id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        name: title,
        description: 'Any Description',
        fullPrice,
        installmentPrice,
        installmentAmount,
        discountAmount,
        stockAmount,
        userId: user.id,
        user
    };

    return (
        <Container onClick={() => onClick(product)}>
            <ImageContainer>
                <img src={image} alt="book cover" />
            </ImageContainer>
            <InfoContainer>
                <PriceContainer>
                    {hasDiscount && (
                        <Price className="full-price">
                            R$ {formatPrice(fullPrice)}
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
                            <Discount>%{discountAmount * 100} OFF</Discount>
                        )}
                    </span>
                    {hasInstallment && (
                        <span>
                            em{' '}
                            <Installment isInterestFree={isInterestFree}>
                                {installmentAmount}x R${' '}
                                {formatPrice(getInstallment())}{' '}
                                {isInterestFree && 'sem juros'}
                            </Installment>
                        </span>
                    )}
                </PriceContainer>
                <div>
                    <Title>{title}</Title>
                    <Seller>por {seller}</Seller>
                </div>
                <div style={{ width: 80 }}>
                    <Rating size={15} rating={rating} />
                </div>
            </InfoContainer>
        </Container>
    );
};

export default ProductCard;
