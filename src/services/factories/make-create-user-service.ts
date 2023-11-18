import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserService } from '../users/create-user'

export function makeCreateUserService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const createUserService = new CreateUserService(prismaUsersRepository)

  return createUserService
}
