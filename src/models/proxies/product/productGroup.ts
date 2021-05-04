import { OrderProxy } from '../order/order';
import { ShoppingCartProxy } from '../shoppingCart/shoppingCart';
import { ProductProxy } from './product';

export interface ProductGroupProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    amount: number;
    orderId: number | null;
    shoppingCartId: number | null;
    productId: number;

    // relations
    product?: ProductProxy;
    order?: OrderProxy;
    shoppingCart?: ShoppingCartProxy;
}
