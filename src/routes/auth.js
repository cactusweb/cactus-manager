import bcrypt from 'bcryptjs'
import express from 'express'

import validate from '../middleware/validate.middleware.js'
import User from '../models/manager/User.js'
import Key from '../models/manager/Key.js'
import {
  createJWT,
  toNextMonth,
  sendMessage
} from '../utils/helper.functions.js'
import config from '../config/config.js'
import {
  signInValidators,
  signUpValidators
} from '../validators/auth.validator.js'

const router = express.Router()

router.post('/signup', signUpValidators, validate, async (req, res) => {
  try {
    const nextMonth = toNextMonth(1)
    const { password, key } = req.body
    await Key.findOneAndDelete({ key })
    const user = await User.create({
      ...req.body,
      password: await bcrypt.hash(password, config.SALT),
      expiresIn: nextMonth
    })
    const accessToken = createJWT(user.id)
    return res.status(200).json({ accessToken })
  } catch (e) {
    return sendMessage(res, 500, 'Something went wrong, try again later', e)
  }
})

router.post('/signin', signInValidators, validate, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    const accessToken = createJWT(user.id)
    return res.status(200).json({ accessToken })
  } catch (e) {
    return sendMessage(res, 500, 'Something went wrong, try again later', e)
  }
})

export default router
