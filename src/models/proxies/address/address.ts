import { UserProxy } from '../user/user';

export interface AddressProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    cep: string;
    street: string;
    houseNumber: number;
    complement: string;
    district: string;
    city: string;
    state: string;
    userId: number;

    // relations
    user?: UserProxy;
}
