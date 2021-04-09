import { ProductProxy } from './product';
import { UserProxy } from './user';

export interface OrderProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    status: number;
    trackingCode: string;
    userId: number;
    productId: number;
    user: UserProxy;
    product: ProductProxy;
}
