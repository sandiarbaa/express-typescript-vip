import { Router } from 'express'
import { registerUser } from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

// http://localhost:4000/product
AuthRouter.post('/register', registerUser)
