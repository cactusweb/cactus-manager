import compression from 'compression'
import { fileURLToPath } from 'url'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'

import regkeyRoutes from './routes/admin/regKey.js'
import adminUsersRoutes from './routes/admin/users.js'
import licensesRoutes from './routes/licenses.js'
import devicesRoutes from './routes/devices.js'
import authRoutes from './routes/auth/auth.js'
import usersRoutes from './routes/users.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const server = express()

server.use(express.static(path.resolve(__dirname, '..', 'public')))
server.use(express.urlencoded({ extended: true }))
server.use(morgan('dev'))
server.use(compression())
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/v1/admin/regkey', regkeyRoutes)
server.use('/api/v1/admin/users', adminUsersRoutes)
server.use('/api/v1/licenses', licensesRoutes)
server.use('/api/v1/devices', devicesRoutes)
server.use('/api/v1/auth', authRoutes)
server.use('/api/v1/users', usersRoutes)

server.get('*', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src * 'self'; script-src * 'self' 'unsafe-inline'; style-src * 'self' 'unsafe-inline'; img-src * 'self' data: https:;"
  )
  return res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

export default server
