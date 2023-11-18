import { Pet, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string, userId: string) {
    const pet = await prisma.pet.findUnique({
      where: { id, created_by: userId },
    })

    return pet
  }

  async findByName(name: string, userId: string) {
    const pet = await prisma.pet.findFirst({
      where: { name, created_by: userId },
    })

    return pet
  }

  async findMany(userId: string, page = 1) {
    const pets = await prisma.pet.findMany({
      where: {
        created_by: userId,
      },
      skip: (page - 1) * 10, // Take only 10 pets
      take: 10,
    })

    return pets
  }

  async save(data: Pet) {
    const pet = await prisma.pet.update({
      where: {
        id: data.id,
      },
      data,
    })

    return pet
  }
}
