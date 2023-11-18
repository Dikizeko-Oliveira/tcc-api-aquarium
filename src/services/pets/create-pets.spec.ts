import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRespository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreatePetService } from './create-pets'
import { InMemoryPetsRespository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetAlreadyExistsError } from '../errors/pet-already-exists-error'

let usersRepository: InMemoryUsersRespository
let petsRepository: InMemoryPetsRespository
let sut: CreatePetService

describe('Create Pet Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository()
    petsRepository = new InMemoryPetsRespository()
    sut = new CreatePetService(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      cpf: '119.435.834-32',
      password_hash: await hash('123456', 6),
    })

    const { pet } = await sut.execute({
      name: 'Bagre',
      ph: '6.7',
      species: 'Test',
      temperature: 23,
      description: 'Test description',
      created_by: createdUser.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create pet with same name twice', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      cpf: '119.435.834-32',
      password_hash: await hash('123456', 6),
    })

    const name = 'Tilapia'

    await sut.execute({
      name,
      ph: '6.7',
      species: 'Test',
      temperature: 23,
      description: 'Test description',
      created_by: createdUser.id,
    })

    await expect(() =>
      sut.execute({
        name,
        ph: '6.7',
        species: 'Test',
        temperature: 23,
        description: 'Test description',
        created_by: createdUser.id,
      }),
    ).rejects.toBeInstanceOf(PetAlreadyExistsError)
  })
})
