import { OrderStatus } from '../../enums/order';
import { ProductProxy } from '../product/product';
import { UserProxy } from '../user/user';
import { AddressProxy } from './../address/address';

export interface OrderProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    status: OrderStatus;
    trackingCode: string;
    amount: number;
    installmentAmount: number;
    totalPrice: number;
    addressId: number;
    userId: number;
    productId: number;

    // relations
    address?: AddressProxy;
    user?: UserProxy;
    product?: ProductProxy;
}
