import { OrderStatus } from '../../enums/order';

export interface CreateOrderPayload {
    status: OrderStatus;
    trackingCode: string;
    amount: number;
    installmentAmount: number;
    totalPrice: number;
    addressId: number;
    userId: number;
    productId: number;
}
