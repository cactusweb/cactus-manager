const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../config/keys')
const User = require('../models/User')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
    const user = await User.findById(decoded.userId)
    if (!user) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    req.user = decoded
    return next()
  } catch (e) {
    return res.status(401).json({ message: 'Нет авторизации' })
  }
}
