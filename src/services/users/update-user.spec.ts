import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRespository } from '@/repositories/in-memory/in-memory-users-repository'
import { UpdateUserService } from './update-user'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let usersRepository: InMemoryUsersRespository
let sut: UpdateUserService

describe('Update User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository()
    sut = new UpdateUserService(usersRepository)
  })

  it('should be able to update a user', async () => {
    const userCreated = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe5@gmail.com',
      cellphone: '11977096899',
      password_hash: '123456',
    })

    const { user } = await sut.execute({
      name: 'John Doe',
      cellphone: '11977096899',
      address: 'London in london',
      address_complement: 'London',
      address_number: 10,
      address_zipcode: '542532',
      birthday: '1999-04-05',
      email: 'test@test.com',
      id: userCreated.id,
    })

    expect(user.address_zipcode).toEqual('542532')
  })

  it('should not be able to update a non existing user', async () => {
    await expect(() =>
      sut.execute({
        name: 'John Doe',
        cellphone: '11977096899',
        address: 'London in london',
        address_complement: 'London',
        address_number: 10,
        address_zipcode: '542532',
        birthday: '1999-04-05',
        email: 'test@test.com',
        id: 'userCreated.id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
