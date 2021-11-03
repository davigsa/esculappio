import { UsersRespository } from '../repositories/UsersRepository'

interface IRequest {
  name: string;
  email: string;
  cpf: string;
}

class CreateUserService {
  private usersRepository: UsersRespository

  constructor (usersRepository: UsersRespository) {
    this.usersRepository = usersRepository
  }

  async execute ({ name, email, cpf }: IRequest): Promise<void> {
    const findUserByEmail = await this.usersRepository.findByEmail(email)

    const findUserByCpf = await this.usersRepository.findByCpf(cpf)

    if (findUserByEmail || findUserByCpf) throw new Error('User already exists')

    await this.usersRepository.create({ name, email, cpf })
  }
}

export { CreateUserService }
