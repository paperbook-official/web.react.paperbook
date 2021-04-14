import { RolesEnum } from '../enums/user';
import { AddressProxy } from './address';
import { OrderProxy } from './order';
import { ProductProxy } from './product';

export interface TokenProxy {
    token: string;
    expiresIn: string;
}

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
    // shoppingCarts?: ShoppingCartProxy[];
    // ratings?: RatingProxy[];
}
