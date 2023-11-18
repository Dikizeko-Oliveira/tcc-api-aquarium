import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { createPetController } from '../create-pet-controller'
import { getPetController } from '../get-pet-controller'
import { fetchPetsController } from '../fetch-pets-controller'

export async function petsRoutes(app: FastifyInstance) {
  // Authenticated routes
  app.addHook('onRequest', verifyJwt)

  app.post('/pets', createPetController)
  app.get('/pets/:id', getPetController)
  app.get('/pets/all', fetchPetsController)
}
