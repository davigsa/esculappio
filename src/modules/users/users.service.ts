import { getRepository } from 'typeorm'

import { User } from './entities/User'

export const findAll = async (): Promise<User[]> => await getRepository(User).find()

export const find = async (id: string): Promise<User> => {
  const user = await getRepository(User).findOne(id)

  if (!user) throw new Error('User not found')

  return user
}

export const create = async (user: User): Promise<User> => {
  const newUser = new User()
  newUser.name = user.name
  newUser.email = user.email
  newUser.cpf = user.cpf

  return await getRepository(User).save(newUser)
}

export const update = async (user: User, id: string): Promise<User> => {
  const actualUser = await getRepository(User).findOne(id)

  if (!actualUser) throw new Error('Could not update this user')

  actualUser.name = user.name
  actualUser.email = user.email
  actualUser.cpf = user.cpf

  return await getRepository(User).save(actualUser)
}

export const remove = async (id: string): Promise<null | void> => {
  const user = await getRepository(User).findOne(id)

  if (!user) throw new Error('User not found')

  await getRepository(User).remove(user)
}
