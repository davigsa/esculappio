import { IUsersRepository } from '../repositories/IUsersRepository'

interface IRequest {
  name: string;
  email: string;
  cpf: string;
}

class CreateUserService {
  private usersRepository: IUsersRepository

  constructor (usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute ({ name, email, cpf }: IRequest): Promise<void> {
    const findUserByEmail = await this.usersRepository.findByEmail(email)
    const findUserByCpf = await this.usersRepository.findByCpf(cpf)

    if (findUserByCpf) throw new Error('This cpf has already been taken')
    if (findUserByEmail) throw new Error('This email has already been taken')

    await this.usersRepository.create({ name, email, cpf })
  }
}

export { CreateUserService }
