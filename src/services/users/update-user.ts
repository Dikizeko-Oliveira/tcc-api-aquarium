import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateUserRequest {
  name: string
  email: string
  cellphone: string | null
  address: string | null
  address_complement: string | null
  address_number: number | null
  address_zipcode: string | null
  birthday: string | null
  id: string
}

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    cellphone,
    email,
    address,
    address_complement,
    address_number,
    address_zipcode,
    birthday,
    id,
  }: UpdateUserRequest) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    user.name = name
    user.cellphone = cellphone
    user.address = address
    user.address_zipcode = address_zipcode
    user.address_number = address_number
    user.address_complement = address_complement
    user.birthday = birthday
    user.email = email

    await this.usersRepository.save(user)

    return { user }
  }
}
