import { BaseUser, User } from './user.interface'
import { Users } from './users.interface'

const data: Users = {
  1: {
    id: 1,
    name: 'George Sanderson',
    email: 'george.sanderson@monsterinc.com',
    cpf: '11111111111'
  },
  2: {
    id: 1,
    name: 'Mike Wazowski',
    email: 'mike.wazowski@monsterinc.com',
    cpf: '22222222222'
  },
  3: {
    id: 1,
    name: 'Randall Boggs',
    email: 'randall.boggs@monsterinc.com',
    cpf: '33333333333'
  }
}

export const findAll = async (): Promise<User[]> => Object.values(data)

export const find = async (id: number): Promise<User> => data[id]

export const create = async (newUser: BaseUser): Promise<User> => {
  const id = new Date().valueOf()

  data[id] = {
    id,
    ...newUser
  }

  return data[id]
}

export const update = async (
  id: number,
  userUpdate: BaseUser
): Promise<User | null> => {
  const item = await find(id)

  if (!item) {
    return null
  }

  data[id] = { id, ...userUpdate }

  return data[id]
}

export const remove = async (id: number): Promise<null | void> => {
  const user = await find(id)

  if (!user) {
    return null
  }

  delete data[id]
}
