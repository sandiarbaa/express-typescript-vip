import Joi from 'joi'
import { ProductType } from '../types/allType'

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow(null),
    size: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}

export const updateProductValidation = (payload: ProductType) => {
  const schema = Joi.object({ // bisa salah 1 saja yg di update
    name: Joi.string().allow(null),
    price: Joi.number().allow(null),
    size: Joi.string().allow(null)
  })

  return schema.validate(payload)
}
