import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { ProductProxy } from '../../../models/proxies/product/product';

import { useCart } from '../../../hooks/useCart';
import { useLoading } from '../../../hooks/useLoading';
import { useShipping } from '../../../hooks/useShipping';

import { CartStorage } from '../../../contexts/cartContext';

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
    const {
        cart,
        localCart,
        updateLocalCart,
        removeProductFromCart,
        loadCart
    } = useCart();
    const { setLoadingContent } = useLoading();

    const [isLoadingCart, setLoadingCart] = useState(false);
    const [isShippingCardVisible, setShippingCardVisible] = useState(false);

    const [cartStorage, setCartStorage] = useState<CartStorage[]>([]);
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
        let cartResponse: CartStorage[] = [];

        if (!cart && !localCart) {
            cartResponse = (await loadCart()) || [];
        } else {
            cartResponse = localCart || [];
        }

        setCartStorage(cartResponse);
        const cartProducts = cartResponse.map((cart) => cart.product);

        if (cartProducts) {
            setProducts(cartProducts);
            setLoadingCart(false);

            if (!option && cep) {
                setOption(options[0]);
                setShippingPrice(options[0].price);
            }

            const price = cartResponse
                .map(
                    (cart) =>
                        cart.product.price *
                        (1 - cart.product.discount) *
                        cart.amount
                )
                .reduce((previous, current) => previous + current, 0);

            setOrderPrice(price);
            setProductsAmount(
                cartResponse
                    .map((cart) => cart.amount)
                    .reduce((previous, current) => previous + current)
            );

            setTotalPrice(
                option ? price + option.price : price + options[0].price
            );

            const instAmount = Math.max(
                ...cartProducts.map((product) => product.installmentAmount)
            );
            setInstallmentAmount(instAmount);

            const instPrice = cartResponse
                .map((cart) => {
                    if (
                        cart.product.installmentPrice &&
                        cart.product.installmentPrice > cart.product.price
                    ) {
                        setInterestFree(false);
                        return (
                            cart.product.installmentPrice *
                            (1 - cart.product.discount) *
                            cart.amount
                        );
                    } else {
                        return (
                            cart.product.price *
                            (1 - cart.product.discount) *
                            cart.amount
                        );
                    }
                })
                .reduce((previous, current) => previous + current, 0);

            setInstallmentPrice(
                option ? instPrice + option.price : instPrice + options[0].price
            );
        }

        setLoadingCart(false);
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

        if (orderPrice !== 0) {
            setTotalPrice(option ? orderPrice + option.price : orderPrice);
        }

        if (cartStorage && cartStorage.length > 0) {
            const instPrice = cartStorage
                .map((cart) => {
                    if (
                        cart.product.installmentPrice &&
                        cart.product.installmentPrice > cart.product.price
                    ) {
                        setInterestFree(false);
                        return (
                            cart.product.installmentPrice *
                            (1 - cart.product.discount) *
                            cart.amount
                        );
                    } else {
                        return (
                            cart.product.price *
                            (1 - cart.product.discount) *
                            cart.amount
                        );
                    }
                })
                .reduce((previous, current) => previous + current, 0);
            setInstallmentPrice(option ? instPrice + option.price : instPrice);
        }
    }, [option]);

    const removeProduct = (product: ProductProxy): void => {
        const prodAmount = getProductAmount(product);
        const newCartStorage = removeProductFromCart(product);
        const productList = [...products];
        const index = productList.indexOf(product);
        if (index !== -1) {
            if (newCartStorage) setCartStorage(newCartStorage);

            productList.splice(index, 1);
            setProducts(productList);

            const ordPrice = orderPrice;
            setOrderPrice(
                ordPrice - product.price * (1 - product.discount) * prodAmount
            );

            const amount = productsAmount;
            setProductsAmount(amount - prodAmount);

            const totPrice = totalPrice;
            setTotalPrice(
                totPrice - product.price * (1 - product.discount) * prodAmount
            );

            const instPrice = installmentPrice;
            setInstallmentPrice(
                product.installmentPrice &&
                    product.installmentPrice > product.price
                    ? instPrice -
                          product.installmentPrice *
                              (1 - product.discount) *
                              prodAmount
                    : instPrice -
                          product.price * (1 - product.discount) * prodAmount
            );

            const noInsterestFree = productList.filter(
                (product) =>
                    product.installmentPrice &&
                    product.installmentPrice > product.price
            );
            setInterestFree(noInsterestFree.length === 0);

            const instAmount = Math.max(
                ...productList.map((product) => product.installmentAmount)
            );
            setInstallmentAmount(instAmount);
        }
    };

    const getProductAmount = (product: ProductProxy): number => {
        const item = cartStorage.filter(
            (cart) => cart.product.id === product.id
        )[0];
        return item.amount;
    };

    const handleCartStorageChange = (
        newAmount: number,
        product: ProductProxy
    ): void => {
        const currentCartStorage = [...cartStorage];
        currentCartStorage.forEach((cart, index) => {
            if (cart.product.id === product.id) {
                currentCartStorage[index].amount = newAmount;
            }
        });

        setCartStorage(currentCartStorage);
        updateLocalCart(currentCartStorage);
    };

    const handleAmountChange = (
        amount: number,
        product: ProductProxy
    ): void => {
        const currentCart = cartStorage.filter(
            (cart) => cart.product.id === product.id
        )[0];
        const currentAmount = productsAmount;
        let newAmount = currentAmount;
        let newOrderPrice = orderPrice;
        let newInstallmentPrice = installmentPrice;
        let newProductAmount = currentCart.amount;

        const pPrice =
            product.installmentPrice && product.installmentPrice > product.price
                ? product.installmentPrice
                : product.price;
        const discount = pPrice * (1 - product.discount);

        if (
            amount > currentCart.amount &&
            currentAmount + 1 <= product.stockAmount
        ) {
            newProductAmount++;
            newAmount = currentAmount + 1;
            newOrderPrice = orderPrice + product.price * (1 - product.discount);
            newInstallmentPrice = installmentPrice + discount;
        } else if (currentAmount - 1 > 0) {
            newProductAmount--;
            newAmount = currentAmount - 1;
            newOrderPrice = orderPrice - product.price * (1 - product.discount);
            newInstallmentPrice = installmentPrice - discount;
        }

        setProductsAmount(newAmount);
        setOrderPrice(newOrderPrice);
        setTotalPrice(
            option
                ? newOrderPrice + option.price
                : newOrderPrice + options[0].price
        );
        setInstallmentPrice(newInstallmentPrice);
        handleCartStorageChange(newProductAmount, product);
    };

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
                            <>
                                <div className="empty-cart">
                                    Seu carrinho está vazio!
                                    <ContinueButton
                                        style={{ width: 220 }}
                                        onClick={() => history.push('/')}
                                    >
                                        Voltar à página inicial
                                    </ContinueButton>
                                </div>
                            </>
                        )}
                        {!isLoadingCart &&
                            products.map((product: ProductProxy) => (
                                <ProductListItem key={product.id}>
                                    <ImageContainer>
                                        {product && product.imageUrl !== '' ? (
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
                                        <span>{product.user?.name}</span>
                                    </InfoContainer>
                                    <AmountPicker
                                        onAmountChange={(amount: number) =>
                                            handleAmountChange(amount, product)
                                        }
                                        initialAmount={getProductAmount(
                                            product
                                        )}
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
                                        onClick={() => removeProduct(product)}
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
