import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import config from '../config/config.js'

export const sendMessage = (res, status, message, error) => {
  if (error) console.error(error.message)
  return res.status(status).json({ message })
}

export const createJWT = id => {
  const options = {
    expiresIn: '15d'
  }
  return jwt.sign({ id }, config.ACCESS_TOKEN_SECRET, options)
}

export const toNextMonth = (next = 1) => {
  const date = new Date()
  date.setMonth(date.getMonth() + next)
  return date
}

export const isSame = (string, hash) => {
  return bcrypt.compareSync(string, hash)
}
