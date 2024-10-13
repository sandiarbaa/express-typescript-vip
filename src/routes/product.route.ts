import { Router } from 'express'
import { createProduct, getProduct } from '../controllers/product.controller'

export const ProductRouter: Router = Router()

// http://localhost:4000/health
ProductRouter.get('/', getProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', createProduct)
