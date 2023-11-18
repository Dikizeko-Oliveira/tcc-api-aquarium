import { FetchPetsService } from '../pets/fetch-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFetchPetsService() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const fetchPets = new FetchPetsService(prismaPetsRepository)

  return fetchPets
}
