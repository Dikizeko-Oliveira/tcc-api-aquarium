import { PetsRepository } from '../../repositories/pets-repository'
import { PetAlreadyExistsError } from '../errors/pet-already-exists-error'

interface CreatePetRequest {
  name: string
  ph: string
  created_by: string
  species: string | null
  description: string | null
  temperature: number | null
}

export class CreatePetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    species,
    ph,
    description,
    temperature,
    created_by,
  }: CreatePetRequest) {
    const petWithSameName = await this.petsRepository.findByName(
      name,
      created_by,
    )

    if (petWithSameName) {
      throw new PetAlreadyExistsError()
    }

    const pet = await this.petsRepository.create({
      name,
      species,
      ph,
      description,
      temperature,
      created_by,
    })

    return { pet }
  }
}
