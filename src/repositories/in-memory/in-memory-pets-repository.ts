import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRespository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description ? data.description : null,
      ideal_light: data.ideal_light ? data.ideal_light : null,
      temperature: data.temperature ? data.temperature : null,
      ph: data.ph,
      species: data.species ? data.species : null,
      created_at: new Date(),
      created_by: data.created_by,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string, userId: string): Promise<Pet | null> {
    const pet = this.items.find(
      (item) => item.id === id && item.created_by === userId,
    )

    if (!pet) {
      return null
    }

    return pet
  }

  async findByName(name: string, userId: string): Promise<Pet | null> {
    const pet = this.items.find(
      (item) => item.name === name && item.created_by === userId,
    )

    if (!pet) {
      return null
    }

    return pet
  }

  async findMany(userId: string, page: number) {
    return this.items
      .filter((item) => item.created_by === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async save(pet: Pet) {
    const petIndex = this.items.findIndex((item) => item.id === pet.id)

    if (petIndex >= 0) {
      this.items[petIndex] = pet
    }

    return pet
  }
}
