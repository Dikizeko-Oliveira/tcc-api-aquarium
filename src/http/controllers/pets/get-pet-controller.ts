import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetPetService } from '@/services/factories/make-get-pet-service'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

export async function getPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = petParamsSchema.parse(request.params)

  try {
    const getPetService = makeGetPetService()

    const { pet } = await getPetService.execute({
      id,
      created_by: request.user.sub,
    })

    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
