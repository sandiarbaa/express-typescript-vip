import { Request, Response } from 'express'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import {
  addProductToDB,
  deleteProductById,
  getProductByIdFromDB,
  getProductFromDB,
  updateProductById
} from '../services/product.service'
import { ProductType } from '../types/allType'
import { v4 as uuidv4 } from 'uuid'

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  req.body.product_id = uuidv4()
  const { error, value } = createProductValidation(req.body)

  if (error) {
    logger.error('ERR: product - create = ', error?.details[0].message)
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error?.details[0].message
    })
    return
  }

  try {
    await addProductToDB(value)
    logger.info('Success add new product')
    res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Add product success'
    })
    return
  } catch (error) {
    logger.error('ERR: product - create = ', error)
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    })
  }
}

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (id) {
      const product = await getProductByIdFromDB(id)
      if (product) {
        logger.info('Success get detail product')
        res.status(200).send({
          status: true,
          statusCode: 200,
          data: product
        })
        return
      } else {
        logger.info('Cannot get detail product')
        res.status(404).send({
          status: false,
          statusCode: 404,
          message: 'Data not found'
        })
        return
      }
    } else {
      const products: ProductType[] = await getProductFromDB()
      logger.info('Success get all product data')
      res.status(200).send({
        status: true,
        statusCode: 200,
        data: products
      })
      return
    }
  } catch (error) {
    logger.error('Error retrieving products:', error)
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  const { error, value } = updateProductValidation(req.body)

  if (error) {
    logger.error('ERR: product - update = ', error?.details[0].message)
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error?.details[0].message
    })
    return
  }

  try {
    // console.log(value);
    const result = await updateProductById(id, value)
    if (result) {
      logger.info('Success update product')
      res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'Update product success'
      })
      return
    } else {
      logger.info('Data not found')
      res.status(404).send({
        status: true,
        statusCode: 404,
        message: 'Data not found'
      })
      return
    }
  } catch (error) {
    logger.error('ERR: product - update = ', error)
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    })
    return
  }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const result = await deleteProductById(id)
    if (result) {
      logger.info('Success delete product')
      res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'Delete product success'
      })
      return
    } else {
      logger.info('Data not found')
      res.status(404).send({
        status: true,
        statusCode: 404,
        message: 'Data not found'
      })
      return
    }
  } catch (error) {
    logger.error('ERR: product - delete = ', error)
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    })
    return
  }
}
