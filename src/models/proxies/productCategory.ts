import { CategoryProxy } from './category';
import { ProductProxy } from './product';

export interface ProductCategoryProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    productId: number;
    categoryId: number;

    // relations
    product?: ProductProxy;
    category?: CategoryProxy;
}
