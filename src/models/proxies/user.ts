export interface TokenProxy {
    token: string;
    expiresIn: string;
}

export interface UserProxy {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    name: string;
    lastName: string;
    email: string;
    cpf: string;
    permissions: string;
    phone: string;
}
