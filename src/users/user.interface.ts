export interface BaseUser {
    name: string;
    email: string;
    cpf: string;
}

export interface User extends BaseUser {
    id: number;
}
