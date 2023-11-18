import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../../../http/middlewares/verify-jwt'
import { userController } from '../user-controller'
import { authenticateController } from '../authenticate-controller'
import { refreshTokenController } from '../refresh-token-controller'
import { profileController } from '../profile-controller'
import { updateUserController } from '../update-user-controller'

export async function usersRoutes(app: FastifyInstance) {
  // No Authenticated routes
  app.post('/users', userController)
  app.post('/sessions', authenticateController)

  app.patch('/token/refresh', refreshTokenController)

  // Authenticated routes
  app.get('/profile', { onRequest: [verifyJwt] }, profileController)
  app.put('/users', { onRequest: [verifyJwt] }, updateUserController)
}
