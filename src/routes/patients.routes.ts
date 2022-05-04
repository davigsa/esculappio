import { Request, Response, NextFunction, Router } from 'express'

import { PatientsRepository } from '../app/repositories/PatientsRepository'
import authMiddleware from '../middleware/auth.middleware'

export const patientsRoutes = Router()
const patientsRepository = new PatientsRepository()

patientsRoutes.post('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId

    const data = await patientsRepository.create({ userId })

    res.status(200).send(data)
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})

patientsRoutes.put('/update/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const { observation } = req.body

    const data = await patientsRepository.update({ id, observation })

    res.status(200).send(data)
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})

patientsRoutes.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await patientsRepository.find()

    res.status(200).send(data)
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})

patientsRoutes.get('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id

    const data = await patientsRepository.findOne(id)

    res.status(200).send(data)
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})
