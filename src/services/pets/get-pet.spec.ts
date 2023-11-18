import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRespository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { GetPetService } from './get-pet'
import { InMemoryPetsRespository } from '@/repositories/in-memory/in-memory-pets-repository'

let usersRepository: InMemoryUsersRespository
let petsRepository: InMemoryPetsRespository
let sut: GetPetService
describe('Get Pet Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository()
    petsRepository = new InMemoryPetsRespository()
    sut = new GetPetService(petsRepository)
  })

  it('should be able to get pet', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      cpf: '119.435.834-32',
      password_hash: await hash('123456', 6),
    })

    const createdPet = await petsRepository.create({
      name: 'Bagre',
      ph: '6.7',
      species: 'Test',
      temperature: 23,
      description: 'Test description',
      created_by: createdUser.id,
    })

    const { pet } = await sut.execute({
      created_by: createdUser.id,
      id: createdPet.id,
    })

    expect(pet.name).toEqual('Bagre')
  })

  it('should not be able to get pet with a wrong id', async () => {
    await expect(() =>
      sut.execute({
        created_by: 'createdUser.id',
        id: 'createdPet.id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
