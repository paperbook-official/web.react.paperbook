import { OrderProxy } from './order';
import { ProductCategoryProxy } from './productCategory';
import { UserProxy } from './user';

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
    productsCategories?: ProductCategoryProxy[];
    // ratings?: RatingProxy[];
    // shoppingCarts: ShoppingCartProxy[];
}
