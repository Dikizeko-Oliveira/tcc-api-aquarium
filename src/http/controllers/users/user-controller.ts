import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '../../../services/errors/user-already-exists-error'
import { makeCreateUserService } from '../../../services/factories/make-create-user-service'

export async function userController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string(),
    password: z.string().min(6),
  })

  const { name, email, cpf, password } = registerBodySchema.parse(request.body)

  try {
    const createUserService = makeCreateUserService()

    await createUserService.execute({ name, email, cpf, password })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
