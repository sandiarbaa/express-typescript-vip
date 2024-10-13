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

export const updateProductById = async (id: String, payload: ProductType): Promise<ProductType | null> => {
  const result = await productModel.findOneAndUpdate({ product_id: id }, { $set: payload })
  return result
}

export const deleteProductById = async (id: String): Promise<ProductType | null> => {
  const result = await productModel.findOneAndDelete({ product_id: id })
  return result
}
