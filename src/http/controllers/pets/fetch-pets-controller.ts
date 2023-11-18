import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchPetsService } from '@/services/factories/fetch-pets-service'

export async function fetchPetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petParamsSchema = z.object({
    page: z.string(),
  })

  const { page } = petParamsSchema.parse(request.query)

  // eslint-disable-next-line no-useless-catch
  try {
    const fetcPetService = makeFetchPetsService()

    const { pets } = await fetcPetService.execute({
      page: Number(page),
      created_by: request.user.sub,
    })

    return reply.status(201).send({ pets })
  } catch (error) {
    throw error
  }
}
