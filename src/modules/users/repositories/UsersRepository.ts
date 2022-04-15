import { getRepository } from 'typeorm'

import HttpException from '../../../common/http-exception'
import { User } from '../entities/User'
import { ICreateUserDTO } from './IUsersRepository'

class UsersRespository {
  private connectUserRepository () {
    return getRepository(User)
  }

  async create ({ name, surname, email, cpf, username, password, telephone, gender }: ICreateUserDTO): Promise<User> {
    const userExists = await this.connectUserRepository().findOne({ where: { cpf } })

    if (userExists) {
      throw new HttpException(409, 'User already exists')
    }

    const user = this.connectUserRepository().create({ name, surname, email, cpf, username, password, telephone, gender })
    await this.connectUserRepository().save(user)

    return user
  }

  async findAll (): Promise<User[]> {
    return await this.connectUserRepository().find()
  }

  async findById (id: string): Promise<User> {
    const userById = await this.connectUserRepository().findOne(id)

    if (!userById) throw new HttpException(404, 'User not found')

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

    if (!userById) throw new HttpException(404, 'User not found')

    Object.assign(userById, {
      name,
      email,
      cpf
    })

    await this.connectUserRepository().save(userById)
  }

  async deleteById (id: string): Promise<void> {
    const userById = await this.connectUserRepository().findOne(id)

    if (!userById) throw new HttpException(404, 'User not found')

    await this.connectUserRepository().remove(userById)
  }
}

export { UsersRespository }
