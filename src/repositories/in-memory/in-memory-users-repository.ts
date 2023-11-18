import { User, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRespository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      cellphone: data.cellphone,
      password_hash: data.password_hash,
      created_at: new Date(),
      address: null,
      address_complement: null,
      address_number: null,
      address_zipcode: null,
      birthday: null,
      cpf: null,
      nationality: null,
      passport_number: null,
      photo_url: null,
      rg: null,
    }

    this.items.push(user)

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findUniqueByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findUniqueByCellphone(cellphone: string) {
    const user = this.items.find((item) => item.cellphone === cellphone)

    if (!user) {
      return null
    }

    return user
  }

  async findUniqueByCpf(cpf: string) {
    const user = this.items.find((item) => item.cpf === cpf)

    if (!user) {
      return null
    }

    return user
  }

  async save(user: User) {
    const userIndex = this.items.findIndex((item) => item.id === user.id)

    if (userIndex >= 0) {
      this.items[userIndex] = user
    }

    return user
  }
}
