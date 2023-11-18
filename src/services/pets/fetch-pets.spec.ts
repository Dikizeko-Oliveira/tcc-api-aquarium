import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRespository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryPetsRespository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsService } from './fetch-pets'

let usersRepository: InMemoryUsersRespository
let petsRepository: InMemoryPetsRespository
let sut: FetchPetsService
describe('Get Pet Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository()
    petsRepository = new InMemoryPetsRespository()
    sut = new FetchPetsService(petsRepository)
  })

  it('should be able to fetxh pets', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      cpf: '119.435.834-32',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
      name: 'Bagre',
      ph: '6.7',
      species: 'Test',
      temperature: 23,
      description: 'Test description',
      created_by: createdUser.id,
    })

    const { pets } = await sut.execute({
      created_by: createdUser.id,
      page: 10,
    })

    expect(pets).toHaveLength(0)
  })

  it('should not be able to fetch pets with a wrong user id', async () => {
    expect(() =>
      sut.execute({
        created_by: 'createdUser.id',
        page: 10,
      }),
    ).toHaveLength(0)
  })
})
