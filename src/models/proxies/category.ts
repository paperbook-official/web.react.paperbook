import { ProductCategoryProxy } from './productCategory';

export interface CategoryProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;

    // relations
    productsCategories?: ProductCategoryProxy[];
}
