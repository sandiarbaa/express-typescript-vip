import jwt, { decode } from 'jsonwebtoken'
import { UserType } from '../types/allType'

export const signJWT = (payload: UserType) => {
  const { user_id, email, role } = payload

  // Pastikan JWT_PRIVATE tidak undefined
  if (!process.env.JWT_PRIVATE) {
    throw new Error('JWT_PRIVATE is not defined')
  }
  return jwt.sign({ user_id, email, role }, process.env.JWT_PRIVATE, { expiresIn: '1d' })
}

export const verifyJWT = (token: string) => {
  try {
    if (!process.env.JWT_PUBLIC) {
      throw new Error('JWT_PRIVATE is not defined')
    }
    const decoded: any = jwt.verify(token, process.env.JWT_PUBLIC)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null
    }
  }
}
