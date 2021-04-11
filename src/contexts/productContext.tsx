import React, { createContext } from 'react';

import { ProductPayload } from '../models/payloads/product';
import { ProductProxy, ManyProductProxy } from '../models/proxies/product';

import api from '../services/api';

import { useAuth } from '../hooks/useAuth';

import { insertParamInQuery } from '../utils/formatters';

export interface ProductContextData {
    createProduct(product: ProductPayload): Promise<ProductProxy>;
    getProductById(id: string, join?: string): Promise<ProductProxy>;
    searchProducts(
        page: number,
        offset: number,
        limit: number,
        join?: string[],
        orderBy?: string[],
        name?: string,
        categoryId?: number,
        minPrice?: number,
        maxPrice?: number,
        state?: string,
        freeOfInterest?: boolean
    ): Promise<ManyProductProxy>;
    getProducts(
        page: number,
        offset: number,
        limit: number,
        join?: string,
        orderBy?: string[]
    ): Promise<ManyProductProxy>;
    getProductsByPrice(
        price: number,
        page: number,
        offset: number,
        limit: number,
        join?: string,
        orderBy?: string[]
    ): Promise<ManyProductProxy>;
    getProductsOnSale(
        page: number,
        offset: number,
        limit: number,
        join?: string,
        orderBy?: string[]
    ): Promise<ManyProductProxy>;
    getInterestFree(
        page: number,
        offset: number,
        limit: number,
        join?: string,
        orderBy?: string[]
    ): Promise<ManyProductProxy>;
    getRecentProducts(
        page: number,
        offset: number,
        limit: number,
        join?: string
    ): Promise<ManyProductProxy>;
    getWellRated(
        page: number,
        offset: number,
        limit: number,
        join?: string,
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

    const concatParam = (url: string, param: string, value: string[]) => {
        let fullUrl: string = url;
        value.forEach((val, index) => {
            if (index !== 0) {
                fullUrl += '&';
            }
            fullUrl += param + '=' + val;
        });

        if (value.length > 0) {
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

    const getProductById = async (
        id: string,
        join = 'user||name'
    ): Promise<ProductProxy> => {
        let url = `/products/${id}?`;
        url += `join=${join}`;

        const response = await api.get<ProductProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const searchProducts = async (
        page: number,
        offset: number,
        limit: number,
        join = ['user||name'],
        orderBy: string[] = [],
        name?: string,
        categoryId?: number,
        minPrice?: number,
        maxPrice?: number,
        state?: string,
        freeOfInterest?: boolean
    ): Promise<ManyProductProxy> => {
        let url: string = concatParam('/search?', 'sort', orderBy);
        url = concatParam(url, 'join', join);
        url = insertParamInQuery(url, 'name', name || '');
        url = insertParamInQuery(url, 'categoryId', categoryId || '');
        url = insertParamInQuery(url, 'minPrice', minPrice || '');
        url = insertParamInQuery(url, 'maxPrice', maxPrice || '');
        url = insertParamInQuery(url, 'state', state || '');
        url = insertParamInQuery(
            url,
            'freeOfInterest',
            freeOfInterest?.toString() || ''
        );
        url += `&limit=${limit}&offset=${offset}&page=${page}`;

        const response = await api.get<ManyProductProxy>(url);
        return response.data;
    };

    const getProducts = async (
        page: number,
        offset: number,
        limit: number,
        join = 'user||name',
        orderBy: string[] = []
    ): Promise<ManyProductProxy> => {
        let url: string = concatParam('/products?', 'sort', orderBy);
        url += `join=${join}&`;
        url += `limit=${limit}&offset=${offset}&page=${page}`;

        const response = await api.get<ManyProductProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getProductsByPrice = async (
        price: number,
        page: number,
        offset: number,
        limit: number,
        join = 'user||name',
        orderBy: string[] = []
    ): Promise<ManyProductProxy> => {
        let url: string = concatParam('/products/less-than?', 'sort', orderBy);
        url += `&maxPrice=${price}`;
        url += `&join=${join}`;
        url += `&limit=${limit}&offset=${offset}&page=${page}`;

        const response = await api.get<ManyProductProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getProductsOnSale = async (
        page: number,
        offset: number,
        limit: number,
        join = 'user||name',
        orderBy: string[] = []
    ): Promise<ManyProductProxy> => {
        let url: string = concatParam('/products/on-sale?', 'sort', orderBy);
        url += `join=${join}&`;
        url += `limit=${limit}&offset=${offset}&page=${page}`;

        const response = await api.get<ManyProductProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getInterestFree = async (
        page: number,
        offset: number,
        limit: number,
        join = 'user||name',
        orderBy: string[] = []
    ): Promise<ManyProductProxy> => {
        let url: string = concatParam(
            '/products/free-of-interests?',
            'sort',
            orderBy
        );
        url += `join=${join}&`;
        url += `limit=${limit}&offset=${offset}&page=${page}`;

        const response = await api.get<ManyProductProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getRecentProducts = async (
        page: number,
        offset: number,
        limit: number,
        join = 'user||name'
    ): Promise<ManyProductProxy> => {
        const url = `/products/recents?join=${join}&limit=${limit}&offset=${offset}&page=${page}`;
        const response = await api.get<ManyProductProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getWellRated = async (
        page: number,
        offset: number,
        limit: number,
        join = 'user||name',
        orderBy: string[] = []
    ): Promise<ManyProductProxy> => {
        let url: string = concatParam('/products?', 'sort', orderBy);
        url += `join=${join}&`;
        url += `limit=${limit}&offset=${offset}&page=${page}`;

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
                getProductById,
                searchProducts,
                getProducts,
                getProductsByPrice,
                getProductsOnSale,
                getInterestFree,
                getRecentProducts,
                getWellRated
            }}
        >
            {children}
        </ProductContext.Provider>

        //#endregion
    );
};

export default ProductProvider;
