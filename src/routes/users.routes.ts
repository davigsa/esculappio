import { Request, Response, NextFunction, Router } from 'express'

import { UsersRespository } from '../modules/users/repositories/UsersRepository'
import authMiddleware from '../middleware/auth.middleware'

export const usersRoutes = Router()
const usersRespository = new UsersRespository()

usersRoutes.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await usersRespository.findAll()

    res.status(200).send(all)
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})

usersRoutes.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const userById = await usersRespository.findById(id)

    res.status(200).send(userById)
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})

usersRoutes.post('/', async (req: Request, res: Response) => {
  const { name, surname, email, cpf, username, password, telephone, gender } = req.body

  try {
    const user = await usersRespository.create({ name, surname, email, cpf, username, password, telephone, gender })

    return res.status(201).send(user)
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})

usersRoutes.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  const id = req.params.id
  const userId = req.userId
  const { name, surname, email, cpf, username, password, telephone, gender } = req.body

  try {
    await usersRespository.updateById(id, userId, { name, surname, email, cpf, username, password, telephone, gender })
    res.status(201).send()
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})

usersRoutes.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  const id = req.params.id
  const userId = req.userId

  try {
    await usersRespository.deleteById(id, userId)

    res.sendStatus(204)
  } catch (e: any) {
    res.status(e.statusCode).send(e.message)
  }
})
