import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { ProductProxy } from '../../../models/proxies/product';

import { useLoading } from '../../../hooks/useLoading';
import { useProduct } from '../../../hooks/useProduct';
import { useShipping } from '../../../hooks/useShipping';

import AmountPicker from '../../../components/atoms/AmountPicker';
import LoadingDots from '../../../components/atoms/LoadingDots';
import Logo from '../../../components/atoms/Logo';
import Modal from '../../../components/atoms/Modal';
import ShippingInfo from '../../../components/atoms/ShippingInfo';
import Header from '../../../components/organisms/Header';
import ShippingCard from '../../../components/organisms/ShippingCard';
import { useTheme } from 'styled-components';

import { formatPrice } from '../../../utils/formatters';

import { ReactComponent as TrashIcon } from '../../../assets/icons/trash.svg';

import {
    BuyMoreButton,
    Container,
    Content,
    ContinueButton,
    DeleteContainer,
    ImageContainer,
    InfoContainer,
    ListContainer,
    OrderDetailsContainer,
    OrderPriceContainer,
    OrderResult,
    OrderResultContainer,
    OrderResultRow,
    ProductListItem,
    ProductPriceContainer,
    ProductTitle,
    Title
} from './styles';

const Cart: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const history = useHistory();
    const { address, cep, option, options, setOption } = useShipping();
    const { getProducts } = useProduct();
    const { setLoadingContent } = useLoading();

    const [isLoadingCart, setLoadingCart] = useState(false);
    const [isShippingCardVisible, setShippingCardVisible] = useState(false);

    const [products, setProducts] = useState<ProductProxy[]>([]);
    const [orderPrice, setOrderPrice] = useState(0);
    const [shippingPrice, setShippingPrice] = useState<number>();
    const [totalPrice, setTotalPrice] = useState(0);
    const [installmentPrice, setInstallmentPrice] = useState(0);
    const [installmentAmount, setInstallmentAmount] = useState(0);
    const [productsAmount, setProductsAmount] = useState(0);
    const [isInterestFree, setInterestFree] = useState(true);

    const initialState = async (): Promise<void> => {
        setLoadingContent(true);

        setLoadingCart(true);
        const response = await getProducts(1, 0, 5);
        setProducts(response.data);
        setLoadingCart(false);

        if (!option && cep) {
            setOption(options[0]);
            setShippingPrice(options[0].price);
        }

        const price = response.data
            .map((product) => product.price * (1 - product.discount))
            .reduce((previous, current) => previous + current, 0);
        setOrderPrice(price);
        setProductsAmount(response.data.length);

        setTotalPrice(option ? price + option.price : price + options[0].price);

        const installmentAmount = Math.max(
            ...response.data.map((product) => product.installmentAmount)
        );
        setInstallmentAmount(installmentAmount);

        const installmentPrice = response.data
            .map((product) => {
                if (
                    product.installmentPrice &&
                    product.installmentPrice > product.price
                ) {
                    setInterestFree(false);
                    return product.installmentPrice;
                } else {
                    return product.price;
                }
            })
            .reduce((previous, current) => previous + current, 0);
        setInstallmentPrice(installmentPrice);

        setLoadingContent(false);
    };

    useEffect(() => {
        initialState();
    }, []);

    useEffect(() => {
        if (!cep || cep === '') {
            setShippingPrice(undefined);
            setTotalPrice(orderPrice);
        } else if (!option) {
            setOption(options[0]);
        }
    }, [cep]);

    useEffect(() => {
        setShippingPrice(option ? option.price : undefined);
        setTotalPrice(option ? orderPrice + option.price : orderPrice);
    }, [option]);

    return (
        <Container>
            <Header isSecondary />
            <Content>
                <Title>Carrinho de compras</Title>
                <div className="divider"></div>
                <OrderDetailsContainer>
                    <ListContainer>
                        {isLoadingCart && (
                            <div className="loading-cart">
                                <LoadingDots />
                            </div>
                        )}
                        {!isLoadingCart && products.length === 0 && (
                            <span className="empty-cart">
                                Seu carrinho está vazio!
                            </span>
                        )}
                        {!isLoadingCart &&
                            products.map((product) => (
                                <ProductListItem key={product.id}>
                                    <ImageContainer>
                                        {product && product.imageUrl === '' ? (
                                            <img
                                                src={product.imageUrl}
                                                alt="Product Image"
                                            />
                                        ) : (
                                            <Logo
                                                size={60}
                                                color={theme.colors.defaultGrey}
                                                showTitle={false}
                                            />
                                        )}
                                    </ImageContainer>
                                    <InfoContainer
                                        onClick={() =>
                                            history.push(
                                                `/products/${product.id}`
                                            )
                                        }
                                    >
                                        <ProductTitle>
                                            {product.name}
                                        </ProductTitle>
                                        <span>{product.user.name}</span>
                                    </InfoContainer>
                                    <AmountPicker
                                        onAmountChange={(amount: number) =>
                                            console.log(amount)
                                        }
                                        stockAmount={product.stockAmount}
                                        showOnlyPicker
                                    />
                                    <ProductPriceContainer>
                                        {product.discount > 0 && (
                                            <span className="full-price">
                                                R$ {formatPrice(product.price)}
                                            </span>
                                        )}
                                        <span>
                                            R${' '}
                                            {formatPrice(
                                                product.price *
                                                    (1 - product.discount)
                                            )}
                                        </span>
                                    </ProductPriceContainer>
                                    <DeleteContainer
                                        onClick={() => console.log(product)}
                                    >
                                        <TrashIcon
                                            height="20"
                                            width="20"
                                            color={theme.colors.defaultRed}
                                        />
                                    </DeleteContainer>
                                </ProductListItem>
                            ))}
                    </ListContainer>
                    {!isLoadingCart && products && products.length > 0 && (
                        <OrderResultContainer>
                            <div>
                                <OrderResult>
                                    <h2>Resumo do pedido</h2>
                                    <div className="shipping-info">
                                        <ShippingInfo
                                            onShippingOptionsClick={() =>
                                                setShippingCardVisible(true)
                                            }
                                            cep={address}
                                            option={option}
                                        />
                                    </div>
                                    <OrderPriceContainer>
                                        <OrderResultRow>
                                            <span className="items">
                                                <strong className="item-amount">
                                                    {productsAmount}
                                                </strong>{' '}
                                                itens
                                            </span>
                                            <span className="price">
                                                R$ {formatPrice(orderPrice)}
                                            </span>
                                        </OrderResultRow>
                                        <OrderResultRow>
                                            <span className="shipping">
                                                Frete
                                            </span>
                                            <span
                                                className={`shipping-price ${
                                                    shippingPrice !==
                                                        undefined &&
                                                    shippingPrice === 0
                                                        ? 'free'
                                                        : !shippingPrice
                                                        ? 'pending'
                                                        : ''
                                                }`}
                                            >
                                                {shippingPrice !== undefined
                                                    ? shippingPrice === 0
                                                        ? 'Grátis'
                                                        : `R$ ${formatPrice(
                                                              shippingPrice
                                                          )}`
                                                    : 'Pendente'}
                                            </span>
                                        </OrderResultRow>
                                        <div className="price-divider"></div>
                                        <OrderResultRow>
                                            <span>Total</span>
                                            <span className="total-price">
                                                R$ {formatPrice(totalPrice)}
                                            </span>
                                        </OrderResultRow>
                                        <span
                                            className={`installment-price ${
                                                isInterestFree
                                                    ? 'interest-free'
                                                    : ''
                                            }`}
                                        >
                                            {installmentAmount}x R${' '}
                                            {formatPrice(
                                                installmentPrice /
                                                    installmentAmount
                                            )}{' '}
                                            {isInterestFree && 'sem juros'}
                                        </span>
                                    </OrderPriceContainer>
                                    <ContinueButton
                                        disabled={!cep || !option}
                                        className={
                                            !cep || !option ? 'disabled' : ''
                                        }
                                        onClick={() =>
                                            history.push('/identification')
                                        }
                                    >
                                        Continuar
                                    </ContinueButton>
                                    <BuyMoreButton
                                        onClick={() => history.push('/')}
                                    >
                                        Continuar comprando
                                    </BuyMoreButton>
                                </OrderResult>
                            </div>
                        </OrderResultContainer>
                    )}
                </OrderDetailsContainer>
            </Content>
            {isShippingCardVisible && (
                <Modal>
                    <ShippingCard
                        options={options}
                        onClose={() => {
                            setShippingCardVisible(false);
                            if (!option && cep) {
                                setOption(options[0]);
                                setShippingPrice(options[0].price);
                                setTotalPrice(orderPrice + options[0].price);
                            }
                        }}
                    />
                </Modal>
            )}
        </Container>
    );
};

export default Cart;
