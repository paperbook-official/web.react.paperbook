import React, { createContext } from 'react';

import { CategoryProxy } from '../models/proxies/category/category';

import api from '../services/api';

export interface CategoryContextData {
    getCategories(
        limit?: number,
        join?: string,
        orderBy?: string[]
    ): Promise<CategoryProxy[]>;
}

interface CategoryProviderProps {
    children: JSX.Element;
}

export const CategoryContext = createContext<CategoryContextData>(
    {} as CategoryContextData
);

export const CategoryProvider: React.FC<CategoryProviderProps> = ({
    children
}: CategoryProviderProps) => {
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

    const getCategories = async (
        limit = 0,
        join = '',
        orderBy: string[] = []
    ): Promise<CategoryProxy[]> => {
        let url: string = concatOrderBy('/categories?', orderBy);
        if (join && join !== '') {
            url += `join=${join}&`;
        }
        url += `limit=${limit}`;

        const response = await api.get<CategoryProxy[]>(url);

        return response.data;
    };

    return (
        //#region JSX

        <CategoryContext.Provider value={{ getCategories }}>
            {children}
        </CategoryContext.Provider>

        //#endregion
    );
};

export default CategoryProvider;
