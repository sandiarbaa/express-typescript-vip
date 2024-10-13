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
