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
    user: UserProxy;
}

export interface ManyProductProxy {
    count: number;
    total: number;
    page: number;
    pageCount: number;
    data: ProductProxy[];
}
