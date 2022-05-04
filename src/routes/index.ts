import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { authRoutes } from './auth.routes'
import { doctorsRoutes } from './doctors.routes'
import { patientsRoutes } from './patients.routes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/auth', authRoutes)
routes.use('/doctors', doctorsRoutes)
routes.use('/patients', patientsRoutes)

export default routes
