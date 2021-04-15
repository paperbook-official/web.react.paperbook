import React, { createContext } from 'react';

import { GetMany } from '../models/getMany';
import { CreateProductPayload } from '../models/payloads/products/createProduct';
import { CategoryProxy } from '../models/proxies/category/category';
import { ProductProxy } from '../models/proxies/product/product';
import { ProductReviewProxy } from '../models/proxies/product/productReview';
import { RatingProxy } from '../models/proxies/rating/rating';

import api from '../services/api';

import { useAuth } from '../hooks/useAuth';

import { insertParamInQuery } from '../utils/formatters';

export interface ProductContextData {
    createProduct(product: CreateProductPayload): Promise<ProductProxy>;
    getProductById(id: number, join?: string): Promise<ProductProxy>;
    getProductCategories(id: number): Promise<CategoryProxy[]>;
    getProductRaitings(id: number): Promise<RatingProxy[]>;
    getProductReview(id: number): Promise<ProductReviewProxy>;
    searchProducts(
        page: number,
        offset: number,
        limit: number,
        join?: string[],
        orderBy?: string[],
        name?: string,
        categoryId?: string,
        minPrice?: string,
        maxPrice?: string,
        state?: string,
        freeOfInterests?: boolean
    ): Promise<GetMany<ProductProxy>>;
    getProducts(
        page: number,
        offset: number,
        limit: number,
        join?: string,
        orderBy?: string[]
    ): Promise<GetMany<ProductProxy>>;
    getProductsByPrice(
        price: number,
        page: number,
        offset: number,
        limit: number,
        join?: string,
        orderBy?: string[]
    ): Promise<GetMany<ProductProxy>>;
    getProductsOnSale(
        page: number,
        offset: number,
        limit: number,
        join?: string,
        orderBy?: string[]
    ): Promise<GetMany<ProductProxy>>;
    getInterestFree(
        page: number,
        offset: number,
        limit: number,
        join?: string,
        orderBy?: string[]
    ): Promise<GetMany<ProductProxy>>;
    getRecentProducts(
        page: number,
        offset: number,
        limit: number,
        join?: string
    ): Promise<GetMany<ProductProxy>>;
    getWellRated(
        page: number,
        offset: number,
        limit: number,
        join?: string,
        orderBy?: string[]
    ): Promise<GetMany<ProductProxy>>;
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
        product: CreateProductPayload
    ): Promise<ProductProxy> => {
        const response = await api.post<ProductProxy>('/products', product);
        return response.data;
    };

    const getProductById = async (
        id: number,
        join = 'user||name'
    ): Promise<ProductProxy> => {
        let url = `/products/${id}?`;
        url += `join=${join}`;

        const response = await api.get<ProductProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getProductCategories = async (
        id: number
    ): Promise<CategoryProxy[]> => {
        const response = await api.get<CategoryProxy[]>(
            `/products/${id}/categories?sort=name,ASC`
        );
        return response.data;
    };

    const getProductRaitings = async (id: number): Promise<RatingProxy[]> => {
        const response = await api.get<RatingProxy[]>(
            `/products/${id}/ratings`
        );
        return response.data;
    };

    const getProductReview = async (
        id: number
    ): Promise<ProductReviewProxy> => {
        const response = await api.get<ProductReviewProxy>(
            `/products/${id}/review`
        );
        return response.data;
    };

    const searchProducts = async (
        page: number,
        offset: number,
        limit: number,
        join: string[] = [],
        orderBy: string[] = [],
        name?: string,
        categoryId?: string,
        minPrice?: string,
        maxPrice?: string,
        state?: string,
        freeOfInterests?: boolean
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam('/search?', 'sort', orderBy);
        url = concatParam(url, 'join', join);

        url = insertParamInQuery(url, 'name', name || '');
        url = insertParamInQuery(url, 'categoryId', categoryId || '');
        url = insertParamInQuery(url, 'minPrice', minPrice || '');
        url = insertParamInQuery(url, 'maxPrice', maxPrice || '');
        url = insertParamInQuery(url, 'state', state || '');
        url = insertParamInQuery(
            url,
            'freeOfInterests',
            freeOfInterests ? 'true' : ''
        );
        url = insertParamInQuery(url, 'limit', limit);
        url = insertParamInQuery(url, 'offset', offset);
        url = insertParamInQuery(url, 'page', page);

        const response = await api.get<GetMany<ProductProxy>>(url);
        return response.data;
    };

    const getProducts = async (
        page: number,
        offset: number,
        limit: number,
        join = 'user||name',
        orderBy: string[] = []
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam('/products?', 'sort', orderBy);
        url += `join=${join}&`;
        url += `limit=${limit}&offset=${offset}&page=${page}`;

        const response = await api.get<GetMany<ProductProxy>>(url, {
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
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam('/products/less-than?', 'sort', orderBy);
        url += `&maxPrice=${price}`;
        url += `&join=${join}`;
        url += `&limit=${limit}&offset=${offset}&page=${page}`;

        const response = await api.get<GetMany<ProductProxy>>(url, {
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
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam('/products/on-sale?', 'sort', orderBy);
        url += `join=${join}&`;
        url += `limit=${limit}&offset=${offset}&page=${page}`;

        const response = await api.get<GetMany<ProductProxy>>(url, {
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
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam(
            '/products/free-of-interests?',
            'sort',
            orderBy
        );
        url += `join=${join}&`;
        url += `limit=${limit}&offset=${offset}&page=${page}`;

        const response = await api.get<GetMany<ProductProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getRecentProducts = async (
        page: number,
        offset: number,
        limit: number,
        join = 'user||name'
    ): Promise<GetMany<ProductProxy>> => {
        const url = `/products/recents?join=${join}&limit=${limit}&offset=${offset}&page=${page}`;
        const response = await api.get<GetMany<ProductProxy>>(url, {
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
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam('/products?', 'sort', orderBy);
        url += `join=${join}&`;
        url += `limit=${limit}&offset=${offset}&page=${page}`;

        const response = await api.get<GetMany<ProductProxy>>(url, {
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
                getProductCategories,
                getProductRaitings,
                getProductReview,
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
