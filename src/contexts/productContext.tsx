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

export interface QueryParams {
    page: number;
    limit: number;
    join?: string[];
    filter?: string[];
    orderBy?: string[];
}

export interface SearchParams {
    page: number;
    limit: number;
    join?: string[];
    orderBy?: string[];
    name?: string;
    categoryId?: string;
    userId?: string;
    minPrice?: string;
    maxPrice?: string;
    state?: string;
    hasDiscount?: boolean;
    freeOfInterests?: boolean;
}

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
        queryParams: QueryParams
    ): Promise<GetMany<ProductProxy> | null>;
    getUserProductRating(
        userId: number,
        productId: number
    ): Promise<RatingProxy[]>;
    updateProductRating(
        ratingId: number,
        updateRating: UpdateRating
    ): Promise<void>;
    searchProducts(searchParams: SearchParams): Promise<GetMany<ProductProxy>>;
    getProducts(queryParams: QueryParams): Promise<GetMany<ProductProxy>>;
    getProductsByCategory(
        categoryId: number,
        queryParams: QueryParams
    ): Promise<GetMany<ProductProxy>>;
    getProductsByPrice(
        price: number,
        queryParams: QueryParams
    ): Promise<GetMany<ProductProxy>>;
    getProductsOnSale(queryParams: QueryParams): Promise<GetMany<ProductProxy>>;
    getInterestFree(queryParams: QueryParams): Promise<GetMany<ProductProxy>>;
    getRecentProducts(queryParams: QueryParams): Promise<GetMany<ProductProxy>>;
    getMostBought(queryParams: QueryParams): Promise<GetMany<ProductProxy>>;
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
        searchParams: SearchParams
    ): Promise<GetMany<ProductProxy>> => {
        const { hasDiscount, userId } = searchParams;

        let url: string = concatParam(
            '/search?',
            'sort',
            searchParams.orderBy || []
        );
        url = concatParam(url, 'join', searchParams.join || ['ratings']);

        if (userId && hasDiscount)
            url = concatParam(url, 'filter', [
                `userId||$eq||${userId}`,
                'discount||$gt||0'
            ]);
        else if (userId)
            url = insertParamInQuery(url, 'filter', `userId||$eq||${userId}`);
        else if (hasDiscount)
            url = insertParamInQuery(url, 'filter', 'discount||$gt||0');

        url = insertParamInQuery(url, 'name', searchParams.name || '');
        url = insertParamInQuery(
            url,
            'categoryId',
            searchParams.categoryId || ''
        );
        url = insertParamInQuery(url, 'minPrice', searchParams.minPrice || '');
        url = insertParamInQuery(url, 'maxPrice', searchParams.maxPrice || '');
        url = insertParamInQuery(url, 'state', searchParams.state || '');
        url = insertParamInQuery(
            url,
            'freeOfInterests',
            searchParams.freeOfInterests ? 'true' : ''
        );

        url = insertParamInQuery(url, 'limit', searchParams.limit);
        url = insertParamInQuery(url, 'page', searchParams.page);

        const response = await api.get<GetMany<ProductProxy>>(url);
        return response.data;
    };

    const getProducts = async (
        queryParams: QueryParams
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam(
            '/products?',
            'sort',
            queryParams.orderBy || []
        );
        url = concatParam(
            url,
            'join',
            queryParams.join || ['user||name', 'ratings']
        );

        url = insertParamInQuery(url, 'limit', queryParams.limit);
        url = insertParamInQuery(url, 'page', queryParams.page);

        const response = await api.get<GetMany<ProductProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getProductsByCategory = async (
        categoryId: number,
        queryParams: QueryParams
    ): Promise<GetMany<ProductProxy>> => {
        let url = concatParam('/products?', 'sort', queryParams.orderBy || []);
        url = concatParam(
            url,
            'join',
            queryParams.join || ['categories', 'user||name', 'ratings']
        );

        url = insertParamInQuery(url, 'limit', queryParams.limit);
        url = insertParamInQuery(url, 'page', queryParams.page);
        url = insertParamInQuery(
            url,
            'filter',
            `categories.id||$eq||${categoryId}`
        );

        const response = await api.get<GetMany<ProductProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getUserProducts = async (
        queryParams: QueryParams
    ): Promise<GetMany<ProductProxy> | null> => {
        if (me) {
            let url: string = concatParam(
                '/users/me/products?',
                'filter',
                queryParams.filter || []
            );
            url = concatParam(
                url,
                'join',
                queryParams.join || ['user||name', 'ratings', 'categories']
            );

            url = insertParamInQuery(url, 'limit', queryParams.limit);
            url = insertParamInQuery(url, 'page', queryParams.page);

            const response = await api.get<GetMany<ProductProxy>>(url, {
                headers: { Authorization: 'Bearer ' + token }
            });
            return response.data;
        }
        return null;
    };

    const getProductsByPrice = async (
        price: number,
        queryParams: QueryParams
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam(
            '/products/less-than?',
            'sort',
            queryParams.orderBy || []
        );
        url = concatParam(
            url,
            'join',
            queryParams.join || ['user||name', 'ratings']
        );

        url = insertParamInQuery(url, 'maxPrice', price);
        url = insertParamInQuery(url, 'limit', queryParams.limit);
        url = insertParamInQuery(url, 'page', queryParams.page);

        const response = await api.get<GetMany<ProductProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getProductsOnSale = async (
        queryParams: QueryParams
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam(
            '/products/on-sale?',
            'sort',
            queryParams.orderBy || []
        );
        url = concatParam(
            url,
            'join',
            queryParams.join || ['user||name', 'ratings']
        );
        url += `limit=${queryParams.limit}&page=${queryParams.page}`;

        const response = await api.get<GetMany<ProductProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getInterestFree = async (
        queryParams: QueryParams
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam(
            '/products/free-of-interests?',
            'sort',
            queryParams.orderBy || []
        );
        url = concatParam(
            url,
            'join',
            queryParams.join || ['user||name', 'ratings']
        );

        url = insertParamInQuery(url, 'limit', queryParams.limit);
        url = insertParamInQuery(url, 'page', queryParams.page);

        const response = await api.get<GetMany<ProductProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getRecentProducts = async (
        queryParams: QueryParams
    ): Promise<GetMany<ProductProxy>> => {
        let url = concatParam(
            '/products/recent?',
            'join',
            queryParams.join || ['user||name', 'ratings']
        );

        url = insertParamInQuery(url, 'limit', queryParams.limit);
        url = insertParamInQuery(url, 'page', queryParams.page);

        const response = await api.get<GetMany<ProductProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getMostBought = async (
        queryParams: QueryParams
    ): Promise<GetMany<ProductProxy>> => {
        let url: string = concatParam(
            '/products/most-bought?',
            'sort',
            queryParams.orderBy || []
        );
        url = concatParam(
            url,
            'join',
            queryParams.join || ['user||name', 'ratings']
        );

        url = insertParamInQuery(url, 'limit', queryParams.limit);
        url = insertParamInQuery(url, 'page', queryParams.page);

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
                getProductsByCategory,
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
