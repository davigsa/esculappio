import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import HttpException from '../common/http-exception'

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware (
  req: Request,
  res: Response,
  next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) throw new HttpException(401, 'Not authorized')

  const tokenJwt = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(tokenJwt, `${process.env.JWT_SECRET}`)
    const { id } = data as TokenPayload

    req.userId = id

    return next()
  } catch {
    throw new HttpException(401, 'Not authorized')
  }
}
