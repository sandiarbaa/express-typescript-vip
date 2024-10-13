import { logger } from '../utils/logger'
import productModel from '../models/product.model'
import { ProductType } from '../types/allType'

export const addProductToDB = async (payload: ProductType): Promise<ProductType> => {
  return await productModel.create(payload)
}

export const getProductFromDB = async (): Promise<ProductType[]> => {
  try {
    const data = await productModel.find()
    return data
  } catch (error) {
    logger.info('Cannot get data from DB')
    logger.error(error)
    return [] // Mengembalikan array kosong jika terjadi kesalahan
  }
}

export const getProductByIdFromDB = async (id: String): Promise<ProductType | null> => {
  return await productModel.findOne({ product_id: id })
}
