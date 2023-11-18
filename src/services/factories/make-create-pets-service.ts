import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { CreatePetService } from '../pets/create-pets'

export function makeCreatePetService() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const createPetService = new CreatePetService(prismaPetsRepository)

  return createPetService
}
