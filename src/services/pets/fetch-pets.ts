import { PetsRepository } from '@/repositories/pets-repository'

interface GetPetRequest {
  page: number
  created_by: string
}

export class FetchPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ page, created_by }: GetPetRequest) {
    const pets = await this.petsRepository.findMany(created_by, page)

    return { pets }
  }
}
