import { Request, Response } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body)

  if (error) {
    logger.error('ERR: product - create = ', error?.details[0].message)
    res.status(422).send({ status: false, statusCode: 422, message: error?.details[0].message, data: {} })
  }

  logger.info('Succes add new product')
  res.status(201).send({ status: true, statusCode: 201, message: 'Add product success', data: value })
}

export const getProduct = (req: Request, res: Response) => {
  const products = [
    { name: 'Sepatu', price: 200000 },
    { name: 'Kaos', price: 100000 }
  ]

  const {
    params: { name }
  } = req

  if (name) {
    const filteredProduct = products.filter((product) => product.name === name)
    if (filteredProduct.length === 0) {
      logger.info('Data not found!')
      res.status(404).send({ status: false, statusCode: 404, data: {} })
    }

    logger.info('Success get detail product')
    res.status(200).send({ status: true, statusCode: 200, data: filteredProduct[0] })
  }

  logger.info('Success get all product data')
  res.status(200).send({ status: true, statusCode: 200, data: products })
}
