import { Router, Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validation/product.validation'

export const ProductRouter: Router = Router()

// http://localhost:4000/health
ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Succes get product data')
  res.status(200).send({ status: true, statusCode: 200, data: [{ name: 'Sepatu Sport', price: 500000 }] })
})

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createProductValidation(req.body)

  if (error) {
    logger.error('ERR: product - create = ', error?.details[0].message)
    res.status(422).send({ status: false, statusCode: 422, message: error?.details[0].message, data: {} })
  }

  logger.info('Succes add new product')
  res.status(201).send({ status: true, statusCode: 201, message: 'Add product success', data: value })
})
