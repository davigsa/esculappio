import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import HttpException from '../../../common/http-exception'
import { User } from '../entities/User'

interface ILoginUserDTO {
  username: string;
  password: string;
}

class AuthRepository {
  private connectUserRepository () {
    return getRepository(User)
  }

  async create ({ username, password }: ILoginUserDTO): Promise<any> {
    const user = await this.connectUserRepository().findOne({ where: { username } })

    if (!user) throw new HttpException(401, 'User not exists')

    const isValidPassword = bcrypt.compare(password, user.password)

    if (!isValidPassword) throw new HttpException(401, 'Wrong password')

    const token = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, { expiresIn: '1d' })

    delete user.password

    return { user, token }
  }
}

export { AuthRepository }
