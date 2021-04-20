import React, { createContext } from 'react';

import { OrderStatus } from '../models/enums/order';
import { CreateOrderPayload } from '../models/payloads/order/createOrder';
import { OrderProxy } from '../models/proxies/order/order';

import api from '../services/api';

import { useAuth } from '../hooks/useAuth';

export interface OrderContextData {
    createOrder(order: CreateOrderPayload): Promise<OrderProxy>;
    updateOrderStatus(status: OrderStatus, orderId: number): Promise<void>;
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

    const createOrder = async (
        order: CreateOrderPayload
    ): Promise<OrderProxy> => {
        const response = await api.post<OrderProxy>('/orders', order, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
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

    return (
        //#region JSX

        <OrderContext.Provider
            value={{
                createOrder,
                updateOrderStatus
            }}
        >
            {children}
        </OrderContext.Provider>

        //#endregion
    );
};

export default OrderProvider;
