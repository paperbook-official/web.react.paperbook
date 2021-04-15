import { ProductProxy } from '../product/product';
import { UserProxy } from '../user/user';

export interface ShoppingCartProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    productId: number;
    userId: number;

    // relations
    product?: ProductProxy;
    user?: UserProxy;
}
