// import { logger } from "../utils/logger";
// import productModel from "../models/product.model";

// export const getProductFromDB = async () => {
//   return await productModel
//     .find()
//     .then((data) => {
//       return data
//     })
//     .catch((error) => {
//       logger.info('Cannot get data from DB')
//       logger.error(error)
//     })
// }

import { logger } from '../utils/logger'
import productModel from '../models/product.model'
import { ProductType } from '../types/allType'

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
