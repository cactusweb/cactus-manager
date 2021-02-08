import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import fetch from 'node-fetch'
import config from '../config/config.js'
import DiscordUser from '../models/manager/DiscordUser.js'

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

// DISCORD
export const getDiscordUserData = async token => {
  const option = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  return await fetch('https://discord.com/api/v8/users/@me', option)
    .then(result => result.json())
    .then(result => result)
    .catch(e => e)
}

export const createDiscordJWT = discordId => {
  const options = {
    expiresIn: '7d'
  }
  return jwt.sign({ discordId }, config.ACCESS_TOKEN_SECRET, options)
}

export const discordUserIsExists = async discordId => {
  return await DiscordUser.exists({ discordId }, (err, doc) => {
    if (err) {
      return new Error('something went wrong')
    }
    return doc
  })
}
