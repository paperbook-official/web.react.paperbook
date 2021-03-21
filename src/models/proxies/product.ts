import { UserProxy } from './user';

export interface ProductProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    name: string;
    description: string;
    fullPrice: number;
    installmentPrice: number;
    installmentAmount: number;
    discountAmount: number;
    stockAmount: number;
    userId: number;
    user: UserProxy;
}
