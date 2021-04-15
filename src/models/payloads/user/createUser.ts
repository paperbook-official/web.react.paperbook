import { RolesEnum } from '../../enums/user';

export interface CreateUserPayload {
    name: string;
    lastName: string;
    email: string;
    password: string;
    cpf?: string;
    roles?: RolesEnum;
    phone?: string;
}
