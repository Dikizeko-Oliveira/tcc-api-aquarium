import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentiaslError } from '../errors/invalid-credentials-errors'

interface AuthenticationServiceRequest {
  email: string
  password: string
}
interface AuthenticationServiceResponse {
  user: User
}
export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticationServiceRequest): Promise<AuthenticationServiceResponse> {
    const user = await this.usersRepository.findUniqueByEmail(email)

    if (!user) {
      throw new InvalidCredentiaslError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentiaslError()
    }

    return { user }
  }
}
