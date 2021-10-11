import { Request, Response, NextFunction, Router } from 'express'
import * as UserService from './users.service'
import { BaseUser, User } from './user.interface'

export const usersRoutes = Router()

usersRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: User[] = await UserService.findAll()
    res.status(200).send(users)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

usersRoutes.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)

  try {
    const user: User = await UserService.find(id)

    if (user) {
      return res.status(200).send(user)
    }
    res.status(404).send('User not found')
  } catch (e) {
    res.status(500).send(e.message)
  }
})

usersRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const user: BaseUser = req.body

    const newUser = await UserService.create(user)

    res.status(201).json(newUser)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

usersRoutes.put('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)

  try {
    const userUpdate: User = req.body

    const existingUser: User = await UserService.find(id)

    if (existingUser) {
      const updatedUser = await UserService.update(id, userUpdate)
      return res.status(200).json(updatedUser)
    }

    const newUser = await UserService.create(userUpdate)

    res.status(201).json(newUser)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

usersRoutes.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10)
    await UserService.remove(id)

    res.sendStatus(204)
  } catch (e) {
    res.status(500).send(e.message)
  }
})
