import React, { createContext, useEffect, useState } from 'react';

import { FinishOrderPayload } from '../models/payloads/order/createOrder';
import { OrderProxy } from '../models/proxies/order/order';
import { ProductProxy } from '../models/proxies/product/product';
import { ProductGroupProxy } from '../models/proxies/product/productGroup';
import { ShoppingCartProxy } from '../models/proxies/shoppingCart/shoppingCart';

import api from '../services/api';

import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';

export interface CartStorage {
    product: ProductProxy;
    amount: number;
}

export interface CartContextData {
    cart?: ShoppingCartProxy;
    setCart(cart?: ShoppingCartProxy): void;
    localCart?: CartStorage[] | null;
    setLocalCart(cart?: CartStorage[] | null): void;
    insertProductInAccCart(productId: number, amount: number): void;
    removeProductFromAccCart(productId: number, amount: number): void;
    loadCart(): Promise<CartStorage[]>;
    getLocalCart(): string | null;
    insertInLocalCart(cart: CartStorage): Promise<void>;
    updateLocalCart(newCartStorage: CartStorage[]): void;
    removeProductFromCart(
        product: ProductProxy,
        amount?: number
    ): CartStorage[] | null | undefined;
    deleteLocalCart(): void;
    finishOrder(payload: FinishOrderPayload): Promise<void>;
}

interface CartProviderProps {
    children: JSX.Element;
}

export const CartContext = createContext<CartContextData>(
    {} as CartContextData
);

export const CartProvider: React.FC<CartProviderProps> = ({
    children
}: CartProviderProps) => {
    const { token } = useAuth();
    const { me } = useUser();

    const [cart, setCart] = useState<ShoppingCartProxy>();
    const [localCart, setLocalCart] = useState<
        CartStorage[] | null | undefined
    >();

    useEffect(() => {
        loadCart();
    }, []);

    useEffect(() => {
        if (me) loadCart();
    }, [me]);

    const getLocalCart = (): string | null => {
        return window.localStorage.getItem('paperbook-cart');
    };

    const deleteLocalCart = (): void => {
        window.localStorage.removeItem('paperbook-cart');
        setLocalCart(null);
    };

    const insertProductInAccCart = (productId: number, amount = 1): void => {
        api.post(
            '/users/me/shopping-cart/add',
            { amount, productId },
            {
                headers: { Authorization: 'Bearer ' + token }
            }
        );
    };

    const removeProductFromAccCart = (productId: number, amount = 1): void => {
        api.post(
            '/users/me/shopping-cart/remove',
            { amount, productId },
            {
                headers: { Authorization: 'Bearer ' + token }
            }
        );
    };

    const loadCart = async (): Promise<CartStorage[]> => {
        let cartToSet = 'null';

        if (token) {
            try {
                const response = await api.get<ShoppingCartProxy>(
                    '/users/me/shopping-cart?join=productGroups',
                    {
                        headers: { Authorization: 'Bearer ' + token }
                    }
                );

                const lCart = getLocalCart();

                if (response.data) {
                    const cartStorage: CartStorage[] = [];

                    const promises =
                        response.data.productGroups?.map((productGroup) => {
                            return api
                                .get<ProductProxy>(
                                    '/products/' + productGroup.productId
                                )
                                .then((productResponse) => {
                                    cartStorage.push({
                                        amount: productGroup.amount,
                                        product: productResponse.data
                                    });
                                });
                        }) || [];

                    await Promise.all(promises);

                    setCart(response.data);

                    if (lCart) {
                        if (cartStorage) {
                            cartToSet = lCart;
                        } else {
                            cartToSet = lCart;
                        }
                    } else {
                        cartToSet = JSON.stringify(cartStorage || 'null');
                    }
                } else {
                    cartToSet = getLocalCart() || 'null';
                }
            } catch (error) {
                if (error.response.status !== 404) {
                    console.log(error);
                }
            }

            if (cartToSet) setLocalCart(JSON.parse(cartToSet));
            return JSON.parse(cartToSet);
        } else {
            const lCart = getLocalCart();
            if (lCart) setLocalCart(JSON.parse(lCart));
            return JSON.parse(lCart || 'null');
        }
    };

    const insertInLocalCart = async (
        cartStorage: CartStorage
    ): Promise<void> => {
        const newCart: CartStorage[] = [];

        if (localCart) {
            const productIds: number[] = localCart.map(
                (lCart) => lCart.product.id
            );

            if (productIds.includes(cartStorage.product.id)) {
                const index = productIds.indexOf(cartStorage.product.id);
                localCart.forEach((lCart, i) => {
                    if (i === index) {
                        lCart = {
                            ...lCart,
                            amount: lCart.amount + cartStorage.amount
                        };
                    }
                    newCart.push(lCart);
                });
            } else {
                newCart.push(...localCart, cartStorage);
            }
        } else {
            newCart.push(cartStorage);
        }

        window.localStorage.setItem('paperbook-cart', JSON.stringify(newCart));
        setLocalCart(newCart);

        if (me) {
            const response = await api.post<ProductGroupProxy>(
                '/users/me/shopping-cart/add',
                {
                    amount: cartStorage.amount,
                    productId: cartStorage.product.id
                },
                {
                    headers: { Authorization: 'Bearer ' + token }
                }
            );

            const productGroup = response.data;

            if (cart) {
                setCart({
                    ...cart,
                    productGroups: [...(cart.productGroups || []), productGroup]
                });
            } else if (productGroup.shoppingCartId) {
                setCart({
                    id: productGroup.shoppingCartId,
                    createdAt: productGroup.createdAt,
                    updatedAt: productGroup.updatedAt,
                    isActive: true,
                    userId: me.id,
                    productGroups: [response.data]
                });
            }
        }
    };

    const updateLocalCart = (newCartStorage: CartStorage[]): void => {
        window.localStorage.setItem(
            'paperbook-cart',
            JSON.stringify(newCartStorage)
        );
        setLocalCart(newCartStorage);
    };

    const removeProductFromCart = (
        product: ProductProxy,
        amount = 1
    ): CartStorage[] | null | undefined => {
        const newCart: CartStorage[] = [];

        if (localCart) {
            if (localCart.length <= amount) {
                deleteLocalCart();
            } else {
                const productIds: number[] = localCart.map(
                    (cart) => cart.product.id
                );
                const productIndex = productIds.indexOf(product.id);

                if (productIndex !== -1) {
                    localCart.splice(productIndex, 1);
                    newCart.push(...localCart);
                }

                window.localStorage.setItem(
                    'paperbook-cart',
                    JSON.stringify(newCart)
                );
                setLocalCart(localCart);
            }
        }

        if (cart) {
            api.post(
                '/users/me/shopping-cart/remove',
                { amount, productId: product.id },
                {
                    headers: { Authorization: 'Bearer ' + token }
                }
            );

            const productIds = cart.productGroups?.map((prod) => prod.id);
            const productIndex = productIds?.indexOf(product.id);

            if (productIndex && productIndex !== -1) {
                const productGroups = cart.productGroups?.splice(
                    productIndex,
                    1
                );
                setCart({ ...cart, productGroups });
            }
        }

        return localCart;
    };

    const finishOrder = async ({
        addressId,
        shippingPrice,
        installmentAmount
    }: FinishOrderPayload): Promise<void> => {
        await api.post<OrderProxy>(
            '/users/me/shopping-cart/finish',
            { addressId, shippingPrice, installmentAmount },
            {
                headers: { Authorization: 'Bearer ' + token }
            }
        );
    };

    return (
        //#region JSX

        <CartContext.Provider
            value={{
                cart,
                setCart,
                localCart,
                setLocalCart,
                insertProductInAccCart,
                removeProductFromAccCart,
                loadCart,
                getLocalCart,
                insertInLocalCart,
                updateLocalCart,
                removeProductFromCart,
                deleteLocalCart,
                finishOrder
            }}
        >
            {children}
        </CartContext.Provider>

        //#endregion
    );
};

export default CartProvider;
