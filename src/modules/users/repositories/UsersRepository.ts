import { getRepository } from 'typeorm'

import { User } from '../entities/User'

interface ICreateUserDTO {
  name: string;
  email: string;
  cpf: string;
}

class UsersRespository {
  private connectUserRepository () {
    return getRepository(User)
  }

  async create ({ name, email, cpf }: ICreateUserDTO): Promise<void> {
    const newUser = new User()

    Object.assign(newUser, {
      name,
      email,
      cpf
    })

    await this.connectUserRepository().save(newUser)
  }

  async findAll (): Promise<User[]> {
    return await this.connectUserRepository().find()
  }

  async findById (id: string): Promise<User> {
    const userById = await this.connectUserRepository().findOne(id)

    if (!userById) throw new Error('User not found')

    return userById
  }

  async findByEmail (email: string): Promise<User | undefined> {
    const userByEmail = await this.connectUserRepository().findOne({ email: email })

    return userByEmail
  }

  async findByCpf (cpf: string): Promise<User | undefined> {
    const userByCpf = await this.connectUserRepository().findOne({ cpf: cpf })

    return userByCpf
  }

  async updateById (id: string, { name, email, cpf }: ICreateUserDTO): Promise<void> {
    const userById = await this.connectUserRepository().findOne(id)

    if (!userById) throw new Error('Could not update this user')

    Object.assign(userById, {
      name,
      email,
      cpf
    })

    await this.connectUserRepository().save(userById)
  }

  async deleteById (id: string): Promise<void> {
    const userById = await this.connectUserRepository().findOne(id)

    if (!userById) throw new Error('User not found')

    await this.connectUserRepository().remove(userById)
  }
}

export { UsersRespository }
