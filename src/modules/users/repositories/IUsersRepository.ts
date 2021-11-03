import { User } from '../entities/User'

interface ICreateUserDTO {
    name: string;
    email: string;
    cpf: string;
  }

interface IUsersRepository {
    create ({ name, email, cpf }: ICreateUserDTO): Promise<void>

    findById (id: string): Promise<User>

    findByEmail (email: string): Promise<User | undefined>

    findByCpf (cpf: string): Promise<User | undefined>

    updateById (id: string, { name, email, cpf }: ICreateUserDTO): Promise<void>

    deleteById (id: string): Promise<void>
}

export { IUsersRepository, ICreateUserDTO }
