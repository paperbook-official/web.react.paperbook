export interface UpdateProductPayload {
    imageUrl?: string;
    name?: string;
    description?: string;
    price?: number;
    installmentPrice?: number;
    installmentAmount?: number;
    discount?: number;
    stockAmount?: number;
    categoryIds?: number[];
}
