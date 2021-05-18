import React, { createContext } from 'react';

import { OrderStatus } from '../models/enums/order';
import { GetMany } from '../models/getMany';
import { OrderProxy } from '../models/proxies/order/order';

import api from '../services/api';

import { useAuth } from '../hooks/useAuth';

import { insertParamInQuery } from '../utils/formatters';

export interface OrderContextData {
    updateOrderStatus(status: OrderStatus, orderId: number): Promise<void>;
    getOrders(
        page: number,
        offset: number,
        limit: number,
        filter?: string[],
        join?: string[]
    ): Promise<GetMany<OrderProxy>>;
}

interface OrderProviderProps {
    children: JSX.Element;
}

export const OrderContext = createContext<OrderContextData>(
    {} as OrderContextData
);

export const OrderProvider: React.FC<OrderProviderProps> = ({
    children
}: OrderProviderProps) => {
    const { token } = useAuth();

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

    const updateOrderStatus = async (
        status: OrderStatus,
        orderId: number
    ): Promise<void> => {
        await api.patch(
            '/orders/' + orderId,
            { status },
            {
                headers: { Authorization: 'Bearer ' + token }
            }
        );
    };

    const getOrders = async (
        page: number,
        offset: number,
        limit: number,
        filter: string[] = [],
        join = ['productGroups', 'productGroups.product']
    ): Promise<GetMany<OrderProxy>> => {
        let url = concatParam('/users/me/orders?', 'join', join);
        url = concatParam(url, 'filter', filter);

        url = insertParamInQuery(url, 'page', page);
        url = insertParamInQuery(url, 'offset', offset);
        url = insertParamInQuery(url, 'limit', limit);
        url = insertParamInQuery(url, 'sort', 'status,ASC');

        const response = await api.get<GetMany<OrderProxy>>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    return (
        //#region JSX

        <OrderContext.Provider
            value={{
                updateOrderStatus,
                getOrders
            }}
        >
            {children}
        </OrderContext.Provider>

        //#endregion
    );
};

export default OrderProvider;
