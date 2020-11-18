import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import User from '../models/manager/User.js'
import { sendMessage } from '../utils/helper.functions.js'

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
