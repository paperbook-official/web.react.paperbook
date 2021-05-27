import React, { createContext } from 'react';

import { GetMany } from '../models/getMany';
import { CreateProductPayload } from '../models/payloads/products/createProduct';
import { UpdateProductPayload } from '../models/payloads/products/updateProduct';
import { CreateRating } from '../models/payloads/rating/createRating';
import { UpdateRating } from '../models/payloads/rating/updateRating';
import { CategoryProxy } from '../models/proxies/category/category';
import { ProductProxy } from '../models/proxies/product/product';
import { ProductReviewProxy } from '../models/proxies/product/productReview';
import { RatingProxy } from '../models/proxies/rating/rating';

import api from '../services/api';

import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';

import { insertParamInQuery } from '../utils/formatters';

import { AxiosResponse } from 'axios';

export interface ProductContextData {
    createProduct(product: CreateProductPayload): Promise<ProductProxy>;
    updateProduct(
        product: UpdateProductPayload,
        id: number
    ): Promise<AxiosResponse<void>>;
    getProductById(id: number, join?: string[]): Promise<ProductProxy>;
    getProductCategories(id: number): Promise<CategoryProxy[]>;
    getProductRatings(id: number): Promise<RatingProxy[]>;
    getProductReview(id: number): Promise<ProductReviewProxy>;
    uploadImage(image: File): Promise<ImageUploadProxy>;
    createProductRating(rating: CreateRating): Promise<void>;
    getUserProducts(
        page: number,
        limit: number,
        join?: string[],
        filter?: string[]
    ): Promise<GetMany<ProductProxy> | null>;
    getUserProductRating(
        userId: number,
        productId: number
    ): Promise<RatingProxy[]>;
    updateProductRating(
        ratingId: number,
        updateRating: UpdateRating
    ): Promise<void>;
    searchProducts(
        page: number,
        offset: number,
        limit: number,
        join?: string[],
        orderBy?: string[],
        name?: string,
        categoryId?: string,
        userId?: string,
        minPrice?: string,
        maxPrice?: string,
        state?: string,
        freeOfInterests?: boolean
    ): Promise<GetMany<ProductProxy>>;
    getProducts(
        page: number,
        offset: number,
        limit: number,
        join?: string[],
        orderBy?: string[]
    ): Promise<GetMany<ProductProxy>>;
    getProductsByPrice(
        price: number,
        page: number,
        offset: number,
        limit: number,
        join?: string[],
        orderBy?: string[]
    ): Promise<GetMany<ProductProxy>>;
    getProductsOnSale(
        page: number,
        offset: number,
        limit: number,
        join?: string[],
        orderBy?: string[]
    ): Promise<GetMany<ProductProxy>>;
    getInterestFree(
        page: number,
        offset: number,
        limit: number,
        join?: string[],
        orderBy?: string[]
    ): Promise<GetMany<ProductProxy>>;
    getRecentProducts(
        page: number,
        offset: number,
        limit: number,
        join?: string[]
    ): Promise<GetMany<ProductProxy>>;
    getWellRated(
        page: number,
        offset: number,
        limit: number,
        join?: string[],
        orderBy?: string[]
    ): Promise<GetMany<ProductProxy>>;
}

interface ImageUploadProxy {
    url: string;
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
    const { me } = useUser();

    const concatParam = (url: string, param: string, value: string[]) => {
        let fullUrl: string = url;
        value.forEach((val, index) => {
            if (!url.includes('?')) {
                fullUrl += '?';
            }
            if (index === 0 && fullUrl[fullUrl.length - 1] !== '?') {
                fullUrl += '&';
            } else if (index !== 0) {
                fullUrl += '&';
            }
            fullUrl += param + '=' + val;
        });

        if (value.length > 0) {
            fullUrl += '&';
        }

        return fullUrl;
    };

    const uploadImage = async (image: File): Promise<ImageUploadProxy> => {
        const formData = new FormData();
        formData.append('file', image);
        const response = await api.post<ImageUploadProxy>(
            '/medias/upload',
            formData,
            {
                headers: {
                    Authentication: 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    };

    const createProduct = async (
        product: CreateProductPayload
    ): Promise<ProductProxy> => {
        const response = await api.post<ProductProxy>('/products', product, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    };

    const updateProduct = async (
        product: UpdateProductPayload,
        id: number
    ): Promise<AxiosResponse<void>> => {
        const response = await api.patch<void>('/products/' + id, product, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response;
    };

    const getProductById = async (
        id: number,
        join = ['user||name', 'ratings']
    ): Promise<ProductProxy> => {
        let url = `/products/${id}?`;
        url = concatParam(url, 'join', join);

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

    const getProductRatings = async (id: number): Promise<RatingProxy[]> => {
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

    const createProductRating = async (rating: CreateRating): Promise<void> => {
        await api.post<void>('/ratings', rating, {
            headers: { Authorization: 'Bearer ' + token }
        });
    };

    const updateProductRating = async (
        ratingId: number,
        updateRating: UpdateRating
    ): Promise<void> => {
        await api.patch<void>('/ratings/' + ratingId, updateRating, {
            headers: { Authorization: 'Bearer ' + token }
        });
    };

    const getUserProductRating = async (
        userId: number,
        productId: number
    ): Promise<RatingProxy[]> => {
        const response = await api.get<RatingProxy[]>(
            `products/${productId}/ratings?filter=userId||$eq||${userId}`,
            {
                headers: { Authorization: 'Bearer ' + token }
            }
        );
        return response.data;
    };

    const searchProducts = async (
        page: number,
        offset: number,
        limit: number,
        join = ['ratings'],
        orderBy: string[] = [],
        name?: string,
        categoryId?: string,
        userId?: string,
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

        if (userId)
            url = insertParamInQuery(url, 'filter', `userId||$eq||${userId}`);

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
        join = ['user||name', 'ratings'],
        orderBy: string[] = []
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam('/products?', 'sort', orderBy);
        url = concatParam(url, 'join', join);

        url = insertParamInQuery(url, 'limit', limit);
        url = insertParamInQuery(url, 'offset', offset);
        url = insertParamInQuery(url, 'page', page);

        const response = await api.get<GetMany<ProductProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getUserProducts = async (
        page: number,
        limit: number,
        join = ['user||name', 'ratings', 'categories'],
        filter: string[] = []
    ): Promise<GetMany<ProductProxy> | null> => {
        if (me) {
            let url: string = concatParam(
                '/users/me/products?',
                'filter',
                filter
            );
            url = concatParam(url, 'join', join);

            url = insertParamInQuery(url, 'limit', limit);
            url = insertParamInQuery(url, 'page', page);

            const response = await api.get<GetMany<ProductProxy>>(url, {
                headers: { Authorization: 'Bearer ' + token }
            });
            return response.data;
        }
        return null;
    };

    const getProductsByPrice = async (
        price: number,
        page: number,
        offset: number,
        limit: number,
        join = ['user||name', 'ratings'],
        orderBy: string[] = []
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam('/products/less-than?', 'sort', orderBy);
        url = concatParam(url, 'join', join);

        url = insertParamInQuery(url, 'maxPrice', price);
        url = insertParamInQuery(url, 'limit', limit);
        url = insertParamInQuery(url, 'offset', offset);
        url = insertParamInQuery(url, 'page', page);

        const response = await api.get<GetMany<ProductProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getProductsOnSale = async (
        page: number,
        offset: number,
        limit: number,
        join = ['user||name', 'ratings'],
        orderBy: string[] = []
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam('/products/on-sale?', 'sort', orderBy);
        url = concatParam(url, 'join', join);
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
        join = ['user||name', 'ratings'],
        orderBy: string[] = []
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam(
            '/products/free-of-interests?',
            'sort',
            orderBy
        );
        url = concatParam(url, 'join', join);

        url = insertParamInQuery(url, 'limit', limit);
        url = insertParamInQuery(url, 'offset', offset);
        url = insertParamInQuery(url, 'page', page);

        const response = await api.get<GetMany<ProductProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getRecentProducts = async (
        page: number,
        offset: number,
        limit: number,
        join = ['user||name', 'ratings']
    ): Promise<GetMany<ProductProxy>> => {
        let url = concatParam('/products/recent?', 'join', join);

        url = insertParamInQuery(url, 'limit', limit);
        url = insertParamInQuery(url, 'offset', offset);
        url = insertParamInQuery(url, 'page', page);

        const response = await api.get<GetMany<ProductProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getWellRated = async (
        page: number,
        offset: number,
        limit: number,
        join = ['user||name', 'ratings'],
        orderBy: string[] = []
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam('/products?', 'sort', orderBy);
        url = concatParam(url, 'join', join);

        url = insertParamInQuery(url, 'limit', limit);
        url = insertParamInQuery(url, 'offset', offset);
        url = insertParamInQuery(url, 'page', page);

        const response = await api.get<GetMany<ProductProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    return (
        //#region JSX

        <ProductContext.Provider
            value={{
                uploadImage,
                createProduct,
                updateProduct,
                getProductById,
                getProductCategories,
                getProductRatings,
                getProductReview,
                createProductRating,
                getUserProducts,
                updateProductRating,
                getUserProductRating,
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
