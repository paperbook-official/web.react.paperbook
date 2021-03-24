export interface ProductPayload {
    name: string;
    description: string;
    fullPrice: number;
    installmentPrice?: number;
    installmentAmount?: number;
    discountAmount?: number;
    stockAmount: number;
    userId: number;
}
