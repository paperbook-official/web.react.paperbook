import { ProductProxy } from '../product/product';
import { UserProxy } from '../user/user';

export interface RatingProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    stars?: number;
    text?: string;
    userId: number;
    productId: number;

    // relations
    user?: UserProxy;
    product?: ProductProxy;
}
