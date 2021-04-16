import React, { createContext, useEffect, useState } from 'react';

import { ProductProxy } from '../models/proxies/product/product';
import { ShoppingCartProxy } from '../models/proxies/shoppingCart/shoppingCart';

import { useAuth } from '../hooks/useAuth';

export interface CartStorage {
    product: ProductProxy;
    amount: number;
}

export interface CartContextData {
    cart?: ShoppingCartProxy;
    setCart(cart?: ShoppingCartProxy): void;
    localCart?: CartStorage[] | null;
    setLocalCart(cart?: CartStorage[] | null): void;
    loadCart(): Promise<CartStorage[]>;
    getLocalCart(): string | null;
    insertInLocalCart(cart: CartStorage): void;
    updateLocalCart(newCartStorage: CartStorage[]): void;
    removeProductFromCart(
        product: ProductProxy
    ): CartStorage[] | null | undefined;
    deleteLocalCart(): void;
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

    const [cart, setCart] = useState<ShoppingCartProxy>();
    const [localCart, setLocalCart] = useState<
        CartStorage[] | null | undefined
    >();

    useEffect(() => {
        if (!cart && !localCart) loadCart();
    }, []);

    const getLocalCart = (): string | null => {
        return window.localStorage.getItem('paperbook-cart');
    };

    const deleteLocalCart = (): void => {
        window.localStorage.removeItem('paperbook-cart');
        setLocalCart(null);
    };

    const loadCart = async (): Promise<CartStorage[]> => {
        if (token) {
            const tCart = getLocalCart();
            if (tCart && tCart !== '') setLocalCart(JSON.parse(tCart));
            return JSON.parse(tCart || 'null');
        } else {
            const tCart = getLocalCart();
            if (tCart && tCart !== '') setLocalCart(JSON.parse(tCart));
            return JSON.parse(tCart || 'null');
        }
    };

    const insertInLocalCart = (cart: CartStorage): void => {
        const newCart: CartStorage[] = [];

        if (localCart) {
            const productIds: number[] = localCart.map(
                (cart) => cart.product.id
            );

            if (productIds.includes(cart.product.id)) {
                newCart.push(...localCart);
            } else {
                newCart.push(...localCart, cart);
            }
        } else {
            newCart.push(cart);
        }

        window.localStorage.setItem('paperbook-cart', JSON.stringify(newCart));
        setLocalCart(newCart);
    };

    const updateLocalCart = (newCartStorage: CartStorage[]): void => {
        window.localStorage.setItem(
            'paperbook-cart',
            JSON.stringify(newCartStorage)
        );
        setLocalCart(newCartStorage);
    };

    const removeProductFromCart = (
        product: ProductProxy
    ): CartStorage[] | null | undefined => {
        const newCart: CartStorage[] = [];

        if (localCart) {
            if (localCart.length <= 1) {
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

        return localCart;
    };

    return (
        //#region JSX

        <CartContext.Provider
            value={{
                cart,
                setCart,
                localCart,
                setLocalCart,
                loadCart,
                getLocalCart,
                insertInLocalCart,
                updateLocalCart,
                removeProductFromCart,
                deleteLocalCart
            }}
        >
            {children}
        </CartContext.Provider>

        //#endregion
    );
};

export default CartProvider;
