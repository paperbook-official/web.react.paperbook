import { UserProxy } from '../user/user';
import { ProductGroupProxy } from './../product/productGroup';

export interface ShoppingCartProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    userId: number;

    // relations
    user?: UserProxy;
    productGroups?: ProductGroupProxy[];
}
