import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const requireUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({
      status: false,
      message: 'Access denied, no token provided'
    })
    return
  }

  try {
    // Verifikasi token dan pastikan decoded bertipe JwtPayload
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE as string) as JwtPayload | string

    // Cek apakah decoded adalah tipe JwtPayload / accesstoken nya valid
    if (typeof decoded === 'object' && decoded !== null) {
      ;(req as any).user = decoded
      next() // Lanjutkan request
    } else {
      res.status(401).json({
        status: false,
        message: 'Invalid token'
      })
    }
  } catch (err) {
    res.status(401).json({
      status: false,
      message: 'Invalid token'
    })
  }
}

// export const requireUser = (req: Request, res: Response, next: NextFunction): void => {
//   const user = res.locals.user
//   if (!user) {
//     res.sendStatus(401)
//     return
//   }

//   console.log('lewat')
//   return next()
// }

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({
      status: false,
      message: 'Access denied, no token provided'
    })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE as string) as JwtPayload | string

    // Pastikan token ter-decode dengan benar
    if (typeof decoded === 'object' && decoded !== null) {
      // Simpan data user di res.locals
      // res.locals.user = decoded

      // Cek apakah user memiliki role admin
      if (decoded.role !== 'admin') {
        res.status(403).json({
          status: false,
          message: 'Forbidden access, not an admin'
        })
        return
      }

      next() // Lanjutkan jika user adalah admin
    } else {
      res.status(401).json({
        status: false,
        message: 'Invalid token'
      })
    }
  } catch (err) {
    res.status(401).json({
      status: false,
      message: 'Invalid token'
    })
  }
}
