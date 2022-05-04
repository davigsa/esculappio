import { Request, Response, NextFunction, Router } from 'express'

import { DoctorsRepository } from '../app/repositories/DoctorsRepository'
import authMiddleware from '../middleware/auth.middleware'

export const doctorsRoutes = Router()
const doctorsRepository = new DoctorsRepository()

doctorsRoutes.post('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { crm, specialization } = req.body
    const userId = req.userId

    const data = await doctorsRepository.create({ crm, specialization, userId })

    res.status(200).send(data)
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})

doctorsRoutes.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await doctorsRepository.find()

    res.status(200).send(data)
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})

doctorsRoutes.get('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id

    const data = await doctorsRepository.findOne(id)

    res.status(200).send(data)
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})
