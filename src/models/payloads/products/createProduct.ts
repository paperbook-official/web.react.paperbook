export interface CreateProductPayload {
    imageUrl?: string;
    name: string;
    description: string;
    price: number;
    installmentPrice?: number;
    installmentAmount?: number;
    discount?: number;
    stockAmount: number;
    userId: number;
    categoryIds?: number[];
}
