import { Request, Response } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { getProductFromDB } from '../services/product.service'
import { ProductType } from '../types/allType'

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = createProductValidation(req.body)

  if (error) {
    logger.error('ERR: product - create = ', error?.details[0].message)
    res.status(422).json({
      status: false,
      statusCode: 422,
      message: error?.details[0].message,
      data: {}
    })
    return
  }

  logger.info('Success add new product')
  res.status(201).json({
    status: true,
    statusCode: 201,
    message: 'Add product success',
    data: value
  })
}

// export const getProduct = async (req: Request, res: Response): Promise<void> => {
//   const products: ProductType[] = await getProductFromDB()

//   const { name } = req.params

//   if (name) {
//     const filteredProduct = products.filter((product: ProductType) => product.name === name)
//     if (filteredProduct.length === 0) {
//       logger.info('Data not found!')
//       res.status(404).json({
//         status: false,
//         statusCode: 404,
//         message: 'Product not found',
//         data: {}
//       })
//       return
//     }

//     logger.info('Success get detail product')
//     res.status(200).json({
//       status: true,
//       statusCode: 200,
//       data: filteredProduct[0]
//     })
//     return
//   }

//   logger.info('Success get all product data')
//   res.status(200).json({
//     status: true,
//     statusCode: 200,
//     data: products
//   })
// }

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: ProductType[] = await getProductFromDB()
    const { name } = req.params

    // Jika nama produk diberikan, cari produk berdasarkan nama
    if (name) {
      const filteredProduct = products.filter((product: ProductType) => product.name === name)

      if (filteredProduct.length === 0) {
        logger.info('Data not found!')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Product not found',
          data: {}
        })
        return
      }

      logger.info('Success get detail product')
      res.status(200).json({
        status: true,
        statusCode: 200,
        data: filteredProduct[0] // Kembalikan produk yang ditemukan
      })
      return
    }

    // Jika tidak ada nama produk yang diberikan, kembalikan semua produk
    logger.info('Success get all product data')
    res.status(200).json({
      status: true,
      statusCode: 200,
      data: products // Kembalikan semua produk
    })
  } catch (error) {
    logger.error('Error retrieving products:', error)
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Internal Server Error',
      data: {}
    })
  }
}
