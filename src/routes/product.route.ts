import { Router } from 'express'
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/product.controller'
import { requireAdmin, requireUser } from '../middleware/auth'

export const ProductRouter: Router = Router()

// http://localhost:4000/product
ProductRouter.get('/', getProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', requireAdmin, createProduct)
ProductRouter.put('/:id', requireAdmin, updateProduct)
ProductRouter.delete('/:id', requireAdmin, deleteProduct)
