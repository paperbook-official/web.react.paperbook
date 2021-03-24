import React, { createContext } from 'react';

import { ProductPayload } from '../models/payloads/product';
import { ProductProxy, ManyProductProxy } from '../models/proxies/product';

import api from '../services/api';

import { useAuth } from '../hooks/useAuth';

export interface ProductContextData {
    createProduct(product: ProductPayload): Promise<ProductProxy>;
    getProducts(
        page: number,
        offset: number,
        limit: number,
        orderBy?: string[]
    ): Promise<ManyProductProxy>;
    getProductsByPrice(
        price: number,
        page: number,
        offset: number,
        limit: number,
        orderBy?: string[]
    ): Promise<ManyProductProxy>;
    getProductsOnSale(
        page: number,
        offset: number,
        limit: number,
        orderBy?: string[]
    ): Promise<ManyProductProxy>;
    getInterestFree(
        page: number,
        offset: number,
        limit: number,
        orderBy?: string[]
    ): Promise<ManyProductProxy>;
    getRecentProducts(
        page: number,
        offset: number,
        limit: number
    ): Promise<ManyProductProxy>;
    getMostBought(
        page: number,
        offset: number,
        limit: number,
        orderBy?: string[]
    ): Promise<ManyProductProxy>;
}

interface ProductProviderProps {
    children: JSX.Element;
}

export const ProductContext = createContext<ProductContextData>(
    {} as ProductContextData
);

export const ProductProvider: React.FC<ProductProviderProps> = ({
    children
}: ProductProviderProps) => {
    const { token } = useAuth();

    const concatOrderBy = (url: string, orderBy: string[]) => {
        let fullUrl: string = url;
        orderBy.forEach((value, index) => {
            if (index !== 0) {
                fullUrl += '&';
            }
            fullUrl += 'sort=' + value;
        });

        if (orderBy.length > 0) {
            fullUrl += '&';
        }

        return fullUrl;
    };

    const createProduct = async (
        product: ProductPayload
    ): Promise<ProductProxy> => {
        const response = await api.post<ProductProxy>('/products', product);
        return response.data;
    };

    const getProducts = async (
        page: number,
        offset: number,
        limit: number,
        orderBy: string[] = []
    ): Promise<ManyProductProxy> => {
        let url: string = concatOrderBy('/products?', orderBy);
        url += `limit=${limit}&offset=${offset}&page=${page}`;

        console.log(url);

        const response = await api.get<ManyProductProxy>(url, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        return response.data;
    };

    const getProductsByPrice = async (
        price: number,
        page: number,
        offset: number,
        limit: number,
        orderBy: string[] = []
    ): Promise<ManyProductProxy> => {
        let url: string = concatOrderBy('/products?', orderBy);
        url += `filter=fullPrice||$lt||${price}`;
        url += `&limit=${limit}&offset=${offset}&page=${page}`;

        console.log('price\n', url);

        const response = await api.get<ManyProductProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });

        return response.data;
    };

    const getProductsOnSale = async (
        page: number,
        offset: number,
        limit: number,
        orderBy: string[] = []
    ): Promise<ManyProductProxy> => {
        let url: string = concatOrderBy('/products/on-sale?', orderBy);
        url += `limit=${limit}&offset=${offset}&page=${page}`;

        console.log('sale\n', url);

        const response = await api.get<ManyProductProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });

        return response.data;
    };

    const getInterestFree = async (
        page: number,
        offset: number,
        limit: number,
        orderBy: string[] = []
    ): Promise<ManyProductProxy> => {
        let url: string = concatOrderBy(
            '/products/free-of-interests?',
            orderBy
        );
        url += `limit=${limit}&offset=${offset}&page=${page}`;

        console.log('interestfree\n', url);

        const response = await api.get<ManyProductProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });

        return response.data;
    };

    const getRecentProducts = async (
        page: number,
        offset: number,
        limit: number
    ): Promise<ManyProductProxy> => {
        const url = `/products/recents?limit=${limit}&offset=${offset}&page=${page}`;
        console.log('recent\n', url);

        const response = await api.get<ManyProductProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });

        return response.data;
    };

    const getMostBought = async (
        page: number,
        offset: number,
        limit: number,
        orderBy: string[] = []
    ): Promise<ManyProductProxy> => {
        let url: string = concatOrderBy('/products?', orderBy);

        url += `limit=${limit}&offset=${offset}&page=${page}`;

        console.log('mostbought\n', url);

        const response = await api.get<ManyProductProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });

        return response.data;
    };

    return (
        //#region JSX

        <ProductContext.Provider
            value={{
                createProduct,
                getProducts,
                getProductsByPrice,
                getProductsOnSale,
                getInterestFree,
                getRecentProducts,
                getMostBought
            }}
        >
            {children}
        </ProductContext.Provider>

        //#endregion
    );
};

export default ProductProvider;
