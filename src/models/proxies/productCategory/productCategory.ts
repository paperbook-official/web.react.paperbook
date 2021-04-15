import { CategoryProxy } from '../category/category';
import { ProductProxy } from '../product/product';

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
