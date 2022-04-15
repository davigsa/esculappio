import { Request, Response, NextFunction, Router } from 'express'

import { AuthRepository } from '../modules/users/repositories/AuthRepository'

export const authRoutes = Router()
const authRepository = new AuthRepository()

authRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body
    const data = await authRepository.create({ username, password })

    res.status(200).send(data)
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})
