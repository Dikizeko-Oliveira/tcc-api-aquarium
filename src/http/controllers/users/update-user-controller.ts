import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateUserService } from '../../../services/factories/make-update-user-service'
import { ResourceNotFoundError } from '../../../services/errors/resource-not-found-error'

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cellphone: z.string().nullable(),
    address: z.string().nullable(),
    address_complement: z.string().nullable(),
    address_number: z.number().nullable(),
    address_zipcode: z.string().nullable(),
    birthday: z.string().nullable(),
  })

  const {
    name,
    cellphone,
    address_complement,
    address_number,
    address_zipcode,
    address,
    birthday,
    email,
  } = registerBodySchema.parse(request.body)

  try {
    const updateUserService = makeUpdateUserService()

    await updateUserService.execute({
      name,
      cellphone,
      address_complement,
      address_number,
      address_zipcode,
      address,
      birthday,
      email,
      id: request.user.sub,
    })
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
