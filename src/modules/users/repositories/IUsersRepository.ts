import { User } from '../entities/User'

interface ICreateUserDTO {
  name: string;
  surname: string;
  email: string;
  cpf: string;
  username: string;
  telephone: string;
  password: string;
  gender: string;
}

interface IUsersRepository {
    create ({ name, surname, email, cpf, username, password, telephone, gender }: ICreateUserDTO): Promise<User>

    findById (id: string): Promise<User>

    findByEmail (email: string): Promise<User | undefined>

    findByCpf (cpf: string): Promise<User | undefined>

    updateById (id: string, { name, surname, email, cpf, username, password, telephone, gender }: ICreateUserDTO): Promise<void>

    deleteById (id: string): Promise<void>
}

export { IUsersRepository, ICreateUserDTO }
