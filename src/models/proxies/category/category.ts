import { ProductCategoryProxy } from '../productCategory/productCategory';

export interface CategoryProxy {
    id: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;

    // relations
    productsCategories?: ProductCategoryProxy[];
}
