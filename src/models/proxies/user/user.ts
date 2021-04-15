import { RolesEnum } from '../../enums/user';
import { AddressProxy } from '../address/address';
import { OrderProxy } from '../order/order';
import { ProductProxy } from '../product/product';
import { RatingProxy } from '../rating/rating';
import { ShoppingCartProxy } from '../shoppingCart/shoppingCart';

export interface UserProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    name: string;
    lastName: string;
    email: string;
    cpf?: string;
    permissions: RolesEnum;
    phone?: string;

    // relations
    addresses?: AddressProxy[];
    products?: ProductProxy[];
    orders?: OrderProxy[];
    shoppingCarts?: ShoppingCartProxy[];
    ratings?: RatingProxy[];
}
