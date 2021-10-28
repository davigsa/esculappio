import { getRepository } from 'typeorm'

import { User } from '../entities/User'

interface IFindUserDTO {
  id: string;
}

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

  async findById ({ id }: IFindUserDTO): Promise<User> {
    const userById = await this.connectUserRepository().findOne(id)

    if (!userById) throw new Error('User not found')

    return userById
  }

  async updateById ({ id }: IFindUserDTO, { name, email, cpf }: ICreateUserDTO): Promise<void> {
    const userById = await this.connectUserRepository().findOne(id)

    if (!userById) throw new Error('Could not update this user')

    Object.assign(userById, {
      name,
      email,
      cpf
    })

    await this.connectUserRepository().save(userById)
  }

  async deleteById ({ id }: IFindUserDTO): Promise<void> {
    const userById = await this.connectUserRepository().findOne(id)

    if (!userById) throw new Error('User not found')

    await this.connectUserRepository().remove(userById)
  }
}

export { UsersRespository }
