export interface AuthPayload {
    email: string;
    password: string;
}

export interface SignUpPayload {
    name: string;
    lastName: string;
    email: string;
    password: string;
    cpf?: string;
    roles?: string;
    phone?: string;
}
