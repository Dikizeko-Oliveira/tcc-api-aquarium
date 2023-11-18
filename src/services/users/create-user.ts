import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface CreateUserRequest {
  name: string
  email: string
  cpf: string
  password: string
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, cpf, password }: CreateUserRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail =
      await this.usersRepository.findUniqueByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      cpf,
      password_hash,
    })

    return { user }
  }
}
