import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getUserProfileService = makeGetUserProfileService()

    const { user } = await getUserProfileService.execute({
      userId: request.user.sub,
    })

    return reply
      .status(200)
      .send({ user: { ...user, password_hash: undefined } })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
