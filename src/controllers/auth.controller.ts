import { Request, Response } from 'express'
import { createSessionValidation, createUserValidation, refreshSessionValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { checkPassword, hashing } from '../utils/hashing'
import { UserType } from '../types/allType'
import { createUser, findUserByEmail } from '../services/auth.service'
import { signJWT, verifyJWT } from '../utils/jwt'

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

export const createSession = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = createSessionValidation(req.body)

  if (error) {
    logger.error('ERR: auth - create session = ', error?.details[0].message)
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error?.details[0].message
    })
    return
  }

  try {
    const user: UserType | null = await findUserByEmail(value.email)

    // Cek apakah user ditemukan
    if (!user) {
      res.status(401).send({
        status: false,
        statusCode: 401,
        message: 'Invalid email or password'
      })
      return
    }

    const isValid: boolean = checkPassword(value.password, user.password)

    if (!isValid) {
      res.status(401).send({
        status: false,
        statusCode: 401,
        message: 'Invalid email or password'
      })
      return
    }

    const accessToken = signJWT(user, '30s')
    const refreshToken = signJWT(user, '1d')

    logger.info('Login success')
    res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Login success',
      data: { accessToken, refreshToken }
    })
    return
  } catch (error: any) {
    logger.error('ERR: auth - create session = ', error.message)
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
    return
  }
}

export const refreshSession = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = refreshSessionValidation(req.body)

  if (error) {
    logger.error('ERR: auth - refresh session = ', error?.details[0].message)
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error?.details[0].message
    })
    return
  }

  try {
    // Verifikasi refresh token
    const { valid, expired, decoded } = verifyJWT(value.refreshToken)

    if (!valid) {
      throw new Error(expired ? 'Refresh token expired' : 'Invalid refresh token')
    }

    // Cari user berdasarkan email dari decoded token
    const user = await findUserByEmail(decoded.email)
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Buat accessToken baru
    const accessToken = signJWT(user, '1d')

    logger.info('Refresh session success')
    res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Refresh session success',
      data: { accessToken }
    })
    return
  } catch (error: any) {
    logger.error('ERR: auth - refresh session = ', error.message)
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
    return
  }
}
