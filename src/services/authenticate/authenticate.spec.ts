import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRespository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentiaslError } from '../errors/invalid-credentials-errors'

let usersRepository: InMemoryUsersRespository
let sut: AuthenticateService
describe('Authenticate User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate a user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      cpf: '119.435.834-82',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'john@doe.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with a wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johnr@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentiaslError)
  })

  it('should not be able to authenticate with a wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      cpf: '119.435.834-02',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john@doe.com',
        password: '12332565',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentiaslError)
  })
})
