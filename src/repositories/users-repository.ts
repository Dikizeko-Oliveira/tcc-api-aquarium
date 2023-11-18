import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  save(user: User): Promise<User>
  findUniqueByEmail(email: string): Promise<User | null>
  findUniqueByCellphone(cellphone: string): Promise<User | null>
  findUniqueByCpf(cpf: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
