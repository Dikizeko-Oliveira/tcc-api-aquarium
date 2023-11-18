import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  save(Pet: Pet): Promise<Pet>
  findById(id: string, userId: string): Promise<Pet | null>
  findByName(name: string, userId: string): Promise<Pet | null>
  findMany(userId: string, page: number): Promise<Pet[]>
}
