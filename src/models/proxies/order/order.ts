import { OrderStatus } from '../../enums/order';
import { ProductGroupProxy } from '../product/productGroup';
import { UserProxy } from '../user/user';

export interface OrderProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    status: OrderStatus;
    trackingCode: string;
    cep: string;
    houseNumber: number;
    installmentAmount: number;
    shippingPrice: number;
    userId: number;

    // relations
    user?: UserProxy;
    productGroups?: ProductGroupProxy[];
}
