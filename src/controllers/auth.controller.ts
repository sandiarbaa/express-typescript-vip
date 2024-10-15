import { Request, Response } from 'express'
import { createUserValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { hashing } from '../utils/hashing'
import { UserType } from '../types/allType'
import { createUser } from '../services/auth.service'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  req.body.user_id = uuidv4()
  const { error, value }: { error: any; value: UserType } = createUserValidation(req.body)

  if (error) {
    logger.error('ERR: auth - register = ', error?.details[0].message)
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error?.details[0].message
    })
    return
  }

  try {
    value.password = `${hashing(value.password)}`
    await createUser(value)
    logger.info('Success register user')
    res.status(201).send({ status: true, statusCode: 201, message: 'Success register user' })
    return
  } catch (error) {
    logger.error('ERR: auth - register = ', error)
    res.status(422).send({ status: false, statusCode: 422, message: error })
    return
  }
}
