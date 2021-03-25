export interface ProductPayload {
    name: string;
    description: string;
    price: number;
    installmentPrice?: number;
    installmentAmount?: number;
    discount?: number;
    stockAmount: number;
    userId: number;
}
