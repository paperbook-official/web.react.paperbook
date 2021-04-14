import { OrderStatus } from '../enums/order';
import { ProductProxy } from './product';
import { UserProxy } from './user';

export interface OrderProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    status: OrderStatus;
    trackingCode: string;
    userId: number;
    productId: number;

    // relations
    user?: UserProxy;
    product?: ProductProxy;
}
