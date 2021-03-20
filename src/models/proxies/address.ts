import { UserProxy } from './user';

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
    user: UserProxy;
}

export interface CEPProxy {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: number;
    gia: number;
    ddd: number;
    siafi: number;
    erro: boolean;
}
