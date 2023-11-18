import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findUniqueByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  }

  async findUniqueByCellphone(cellphone: string) {
    const user = await prisma.user.findFirst({
      where: { cellphone },
    })

    return user
  }

  async findUniqueByCpf(cpf: string) {
    const user = await prisma.user.findUnique({
      where: { cpf },
    })

    return user
  }

  async findUniqueByRg(rg: string) {
    const user = await prisma.user.findUnique({
      where: { rg },
    })

    return user
  }

  async findUniqueByPassportNumber(passport_number: string) {
    const user = await prisma.user.findUnique({
      where: { passport_number },
    })

    return user
  }

  async save(data: User) {
    const checkIn = await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }
}
