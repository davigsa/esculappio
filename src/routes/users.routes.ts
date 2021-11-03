import { Request, Response, NextFunction, Router } from 'express'

import { UsersRespository } from '../modules/users/repositories/UsersRepository'
import { CreateUserService } from '../modules/users/services/CreateUserService'

export const usersRoutes = Router()
const usersRespository = new UsersRespository()

usersRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await usersRespository.findAll()

    res.status(200).send(all)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

usersRoutes.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const userById = await usersRespository.findById({ id })

    res.status(200).send(userById)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

usersRoutes.post('/', async (req: Request, res: Response) => {
  const { name, email, cpf } = req.body

  try {
    const createUserService = new CreateUserService(usersRespository)

    await createUserService.execute({ name, email, cpf })

    return res.status(201).send()
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

usersRoutes.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const { name, email, cpf } = req.body

  try {
    await usersRespository.updateById({ id }, { name, email, cpf })
    res.status(201).send()
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

usersRoutes.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    await usersRespository.deleteById({ id })

    res.sendStatus(204)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})
