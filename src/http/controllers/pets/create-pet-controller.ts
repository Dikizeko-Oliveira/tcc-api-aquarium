import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePetService } from '../../../services/factories/make-create-pets-service'
import { PetAlreadyExistsError } from '../../../services/errors/pet-already-exists-error'

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    ph: z.string(),
    temperature: z.number(),
    description: z.string(),
    species: z.string(),
  })

  const { name, ph, temperature, description, species } =
    registerBodySchema.parse(request.body)

  try {
    const createUserService = makeCreatePetService()

    const { pet } = await createUserService.execute({
      name,
      ph,
      temperature,
      description,
      species,
      created_by: request.user.sub,
    })

    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof PetAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
