import { NextFunction, Request, Response } from 'express'
import { verifyJWT } from '../utils/jwt'

const deserializeToken = async (req: Request, res: Response, next: NextFunction) => {
  // const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '')
  const accessToken = req.headers.authorization?.split(' ')[1]

  if (!accessToken) {
    return next()
  }

  const { decoded, expired } = verifyJWT(accessToken)
  if (decoded) {
    res.locals.user = decoded // decoded adalah isi dari token jwt
    return next()
  }
  
  if (expired) {
    return next()
  }
  
  return next()
}

export default deserializeToken
