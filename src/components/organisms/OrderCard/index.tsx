import React, { useEffect, useState } from 'react';

import { CEPProxy } from '../../../models/proxies/cep/cep';
import { OrderProxy } from '../../../models/proxies/order/order';
import { ProductProxy } from '../../../models/proxies/product/product';

import { useActionResult } from '../../../hooks/useActionResult';
import { useShipping } from '../../../hooks/useShipping';

import { useTheme } from 'styled-components';

import { formatPrice } from '../../../utils/formatters';

import { ReactComponent as TruckIcon } from '../../../assets/icons/truck.svg';

import Logo from '../../atoms/Logo';
import {
    AddressInfo,
    Container,
    Content,
    Date,
    DetailsContainer,
    ImageContainer,
    InfoContainer,
    InstallmentPrice,
    Price,
    ProductGroupCard,
    RateIcon,
    Seller,
    StatusContainer,
    Title,
    TrackingCode
} from './styles';

interface OrderCardProps {
    order: OrderProxy;
    style?: React.CSSProperties;
    onRateClick(product: ProductProxy): void;
}

const OrderCard: React.FC<OrderCardProps> = ({
    order,
    style,
    onRateClick
}: OrderCardProps): JSX.Element => {
    const theme = useTheme();
    const { getAddress } = useShipping();
    const { setTooltipText, setTooltipVisible } = useActionResult();

    const [isInterestFree, setInterestFree] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [firstProductName, setFirstProductName] = useState('');
    const [productAmount, setProductAmount] = useState(0);
    const [address, setAddress] = useState<CEPProxy>();

    const initialState = async (): Promise<void> => {
        const addressResponse = await getAddress(order.cep);

        if (!addressResponse.erro) setAddress(addressResponse);

        let orderPrice = 0;
        let amount = 0;
        const promises =
            order.productGroups?.map((productGroup, index) => {
                const freeOfInterests =
                    order.installmentAmount <= 1 ||
                    !productGroup.product?.installmentPrice ||
                    productGroup.product?.installmentPrice <=
                        productGroup.product?.price;

                if (!freeOfInterests) setInterestFree(false);

                if (index === 0)
                    setFirstProductName(productGroup.product?.name || '');

                const price = freeOfInterests
                    ? productGroup.product?.price
                    : productGroup.product?.installmentPrice;
                orderPrice +=
                    (price || 0) *
                    (1 - (productGroup.product?.discount || 0)) *
                    productGroup.amount;
                amount++;

                return price;
            }) || [];

        await Promise.all(promises);

        setTotalPrice(orderPrice + order.shippingPrice);
        setProductAmount(amount);
    };

    useEffect(() => {
        initialState();
    }, []);

    const getStatus = (isColor?: boolean): string => {
        if (!isColor) {
            if (order.status === 0) return 'Pendente';
            else if (order.status === 1) return 'Entregue';
            else return 'Cancelado';
        }

        if (order.status === 0) return '#ffa800';
        else if (order.status === 1) return theme.colors.defaultLightGreen;
        else return theme.colors.defaultRed;
    };

    const formatDate = (isoString: string): string => {
        return `${isoString.substr(8, 2)}/${isoString.substr(
            5,
            2
        )}/${isoString.substr(0, 4)}`;
    };

    const handleOrderClick = (): void => {
        const orderCardContent = document.getElementsByClassName(
            'order-card-content-' + order.id
        )[0];
        const productList = document.getElementsByClassName(
            'product-list-' + order.id
        )[0];

        if (orderCardContent && productList) {
            if (orderCardContent.classList.contains('active')) {
                setTimeout(() => {
                    orderCardContent.classList.remove('active');
                }, 300);
            }
            orderCardContent.classList.add('active');

            if (!productList.classList.contains('active')) {
                setTimeout(() => {
                    productList.classList.add('active');
                }, 100);
            }
            productList.classList.remove('active');
        }
    };

    return (
        <Container
            style={style}
            orderId={order.id}
            productAmount={order.productGroups?.length || 0}
        >
            <Content
                className={'order-card-content-' + order.id}
                onClick={handleOrderClick}
            >
                <InfoContainer>
                    <Title>
                        {firstProductName}
                        {productAmount > 1 && (
                            <span> + {productAmount - 1}</span>
                        )}
                    </Title>
                    {address && (
                        <div className="address">
                            <AddressInfo>{`${address.logradouro}, ${order.houseNumber} - ${address.bairro}`}</AddressInfo>
                            <AddressInfo>{`${address.localidade} - ${address.uf}`}</AddressInfo>
                        </div>
                    )}
                    <div className="order-price">
                        <InstallmentPrice
                            className={isInterestFree ? 'interest-free' : ''}
                        >{`${order.installmentAmount}x R$ ${formatPrice(
                            totalPrice / order.installmentAmount
                        )} ${
                            isInterestFree ? 'sem juros' : ''
                        }`}</InstallmentPrice>
                        <Price>{`R$ ${formatPrice(totalPrice)}`}</Price>
                    </div>
                </InfoContainer>
                <DetailsContainer>
                    <StatusContainer>
                        <TruckIcon
                            style={{ transform: 'scaleX(-1)' }}
                            color={getStatus(true)}
                            height={30}
                            width={30}
                        />
                        <span
                            className="status"
                            style={{ color: getStatus(true) }}
                        >
                            {getStatus()}
                        </span>
                    </StatusContainer>
                    <div className="second">
                        <TrackingCode>{order.trackingCode}</TrackingCode>
                        <Date>
                            Data da compra: {formatDate(order.createdAt)}
                        </Date>
                    </div>
                </DetailsContainer>
            </Content>
            <div className={'product-list-' + order.id}>
                {order.productGroups?.map((productGroup) => {
                    const product = productGroup.product;

                    const freeOfInterests =
                        order.installmentAmount <= 1 ||
                        !product?.installmentPrice ||
                        product?.installmentPrice <= product?.price;

                    const price =
                        (freeOfInterests
                            ? product?.price
                            : product?.installmentPrice) || 0;

                    const productPrice =
                        price *
                        (1 - (product?.discount || 0)) *
                        productGroup.amount;

                    return (
                        product && (
                            <ProductGroupCard key={product.id}>
                                <ImageContainer>
                                    {product.imageUrl &&
                                    product.imageUrl !== '' ? (
                                        <img
                                            src={product.imageUrl}
                                            alt="Product Image"
                                        />
                                    ) : (
                                        <div className="logo-icon">
                                            <Logo
                                                showTitle={false}
                                                color={
                                                    theme.colors.defaultGrey +
                                                    '88'
                                                }
                                                size={100}
                                            />
                                        </div>
                                    )}
                                </ImageContainer>
                                <div className="info">
                                    <InfoContainer>
                                        <div className="title-seller">
                                            <Title>{product.name}</Title>
                                            <Seller>
                                                {product.user?.name || 'Seller'}
                                            </Seller>
                                        </div>
                                        <div className="product-price">
                                            <Price>
                                                R$ {formatPrice(productPrice)}
                                            </Price>
                                        </div>
                                    </InfoContainer>
                                    <DetailsContainer>
                                        <div className="actions-container">
                                            <RateIcon
                                                onMouseEnter={() => {
                                                    setTooltipText('Avaliar');
                                                    setTooltipVisible(true);
                                                }}
                                                onMouseLeave={() =>
                                                    setTooltipVisible(false)
                                                }
                                                onClick={() =>
                                                    onRateClick(product)
                                                }
                                            />
                                        </div>
                                        <span className="product-amount">
                                            Quantidade:{' '}
                                            <span className="product-amount-number">
                                                {productGroup.amount}
                                            </span>
                                        </span>
                                    </DetailsContainer>
                                </div>
                            </ProductGroupCard>
                        )
                    );
                })}
            </div>
        </Container>
    );
};

export default OrderCard;
