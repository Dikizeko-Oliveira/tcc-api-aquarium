import { PetsRepository } from '../../repositories/pets-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetPetRequest {
  id: string
  created_by: string
}

export class GetPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id, created_by }: GetPetRequest) {
    const pet = await this.petsRepository.findById(id, created_by)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
