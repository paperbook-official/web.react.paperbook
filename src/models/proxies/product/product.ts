import { CategoryProxy } from '../category/category';
import { OrderProxy } from '../order/order';
import { RatingProxy } from '../rating/rating';
import { ShoppingCartProxy } from '../shoppingCart/shoppingCart';
import { UserProxy } from '../user/user';

export interface ProductProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
    installmentPrice: number;
    installmentAmount: number;
    discount: number;
    stockAmount: number;
    userId: number;

    // relations
    user?: UserProxy;
    orders?: OrderProxy[];
    categories?: CategoryProxy[];
    ratings?: RatingProxy[];
    shoppingCarts?: ShoppingCartProxy[];
}
