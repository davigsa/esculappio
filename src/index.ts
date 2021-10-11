import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import { usersRoutes } from './users/user.routes'
import { errorHandler } from './middleware/error.middleware'
import { notFoundHandler } from './middleware/not-found.middleware'

dotenv.config()

if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/users', usersRoutes)

// Threating Errors
app.use(errorHandler)
app.use(notFoundHandler)

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`)
})
