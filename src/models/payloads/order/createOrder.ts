import { OrderStatus } from '../../enums/order';

export interface CreateOrderPayload {
    status: OrderStatus;
    trackingCode: string;
    userId: number;
    productId: number;
}
