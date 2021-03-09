import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import User from '../models/manager/User.js'
import { sendMessage } from '../utils/helper.functions.js'
import DiscordUser from '../models/manager/DiscordUser.js'

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    if (!token) {
      return sendMessage(res, 401, 'No authorization')
    }
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET)
    const user = await User.findOne({
      _id: decoded.id,
      expiresIn: { $gt: Date.now() }
    })
    if (!user) {
      return sendMessage(res, 401, 'No authorization')
    }
    req.user = decoded
    return next()
  } catch (e) {
    return sendMessage(res, 401, 'No authorization')
  }
}

export const checkDiscordUserAuth = async (req, res, next) => {
  try {
    const token = req.header.authorization.split(' ')[1]
    if (!token) {
      return sendMessage(res, 401, 'No authorization')
    }

    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET)
    const discordUser = await DiscordUser.findOne({
      discordId: decoded.discordId,
      expiresIn: { $gt: Date.now() }
    })
    if (!discordUser) {
      return sendMessage(res, 401, 'No authorization')
    }
    req.user = decoded
    return next()
  } catch (e) {
    return sendMessage(res, 401, 'No authorization')
  }
}
