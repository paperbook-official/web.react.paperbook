export interface CreateAddressPayload {
    cep: string;
    street: string;
    houseNumber: number;
    complement: string;
    district: string;
    city: string;
    state: string;
    userId: number;
}
