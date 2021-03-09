import compression from 'compression'
import { fileURLToPath } from 'url'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'

import licensesRoutes from './routes/licenses.js'
import devicesRoutes from './routes/devices.js'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import discordRoutes from './routes/discord.js'
import bindRoutes from './routes/bind.js'
import dropRoutes from './routes/drop.js'
import uploadsRoutes from './routes/uploads.js'
import planRoutes from './routes/plan.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const server = express()

server.use(express.static(path.resolve(__dirname, '..', 'public')))
server.use(express.static(path.resolve(__dirname, '..', 'uploads')))
server.use(express.urlencoded({ extended: true }))
server.use(morgan('dev'))
server.use(compression())
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/v1/licenses', licensesRoutes)
server.use('/api/v1/devices', devicesRoutes)
server.use('/api/v1/auth', authRoutes)
server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/discord', discordRoutes)
server.use('/api/v1/bind', bindRoutes)
server.use('/api/v1/drop', dropRoutes)
server.use('/api/v1/uploads', uploadsRoutes)
server.use('/api/v1/plan', planRoutes)

server.get('*', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src * 'self'; script-src * 'self' 'unsafe-inline'; style-src * 'self' 'unsafe-inline'; img-src * 'self' data: https:;"
  )
  return res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

export default server
