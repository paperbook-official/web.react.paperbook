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
    insertInLocalCart(cart: CartStorage): void;
    removeProductFromCart(product: ProductProxy): void;
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
        if (token) {
            console.log(token);
        } else {
            const localCart = getLocalCart();
            if (localCart && localCart !== '')
                setLocalCart(JSON.parse(localCart));
        }
    }, []);

    const getLocalCart = (): string | null => {
        return window.localStorage.getItem('paperbook-cart');
    };

    const deleteLocalCart = (): void => {
        window.localStorage.removeItem('paperbook-cart');
        setLocalCart(null);
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

    const removeProductFromCart = (product: ProductProxy): void => {
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
                    newCart.push(...localCart.splice(productIndex, 1));
                }

                window.localStorage.setItem(
                    'paperbook-cart',
                    JSON.stringify(newCart)
                );
                setLocalCart(localCart);
            }
        }
    };

    return (
        //#region JSX

        <CartContext.Provider
            value={{
                cart,
                setCart,
                localCart,
                setLocalCart,
                insertInLocalCart,
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
