import React, { useState } from 'react';

import { CEPProxy } from '../../../models/proxies/cep/cep';
import { ProductProxy } from '../../../models/proxies/product/product';

import { useShipping } from '../../../hooks/useShipping';

import { ShippingOptionData } from '../../../contexts/shippingContext';

import { useTheme } from 'styled-components';

import { formatPrice } from '../../../utils/formatters';

import { ReactComponent as MapMarkerIcon } from '../../../assets/icons/map-marker.svg';
import { ReactComponent as TruckIcon } from '../../../assets/icons/truck.svg';

import AmountPicker from '../../atoms/AmountPicker';
import Rating from '../../atoms/Rating';
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
    ShippingArriveDate,
    ShippingContainer,
    ShippingOption,
    SellerContainer,
    Title
} from './styles';

interface ProductBuyingCardProps {
    product: ProductProxy;
    cep?: CEPProxy;
    shippingOption?: ShippingOptionData;
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
    const theme = useTheme();
    const { getArriveDate } = useShipping();

    const [buyAmount, setBuyAmount] = useState(1);

    const hasDiscount = product.discount > 0;
    const currentPrice = product.price * (1 - product.discount);
    const isShippingFree = shippingOption?.price === 0;
    const isInterestFree =
        product.installmentPrice === null ||
        product.installmentPrice * (1 - product.discount) <= currentPrice;

    const handleAmountChange = (amount: number): void => {
        setBuyAmount(amount);
    };

    return (
        <Container>
            <HeaderContainer>
                <Title>{product.name}</Title>
                <span className="rating">
                    <Rating rating={5} size={16} />
                    <RatingAmount>26</RatingAmount>
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

            <ShippingContainer>
                {!cep || !shippingOption ? (
                    <>
                        <MapMarkerIcon
                            height="18"
                            width="18"
                            style={{ transform: 'scaleX(-1)' }}
                            color={theme.colors.defaultHighlightGreyBlue}
                        />
                        <ShippingOption onClick={onShippingOptionsClick}>
                            Calcular prazo de entrega
                        </ShippingOption>
                    </>
                ) : (
                    <>
                        <TruckIcon
                            height="22"
                            width="22"
                            style={{ transform: 'scaleX(-1)' }}
                            color={
                                isShippingFree
                                    ? theme.colors.defaultLightGreen
                                    : theme.colors.defaultMidGrey
                            }
                        />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <ShippingArriveDate
                                className={
                                    isShippingFree ? 'shipping-free' : ''
                                }
                            >
                                Chegará{' '}
                                {getArriveDate(
                                    shippingOption.daysToArrive,
                                    shippingOption.price
                                )}
                            </ShippingArriveDate>
                            <ShippingOption
                                className="more-options"
                                onClick={onShippingOptionsClick}
                            >
                                Ver mais opções de entrega
                            </ShippingOption>
                        </div>
                    </>
                )}
            </ShippingContainer>

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
