import express from 'express'
import User from '../models/manager/User.js'
import auth from '../middleware/auth.middleware.js'
import { sendMessage } from '../utils/helper.functions.js'

const router = express.Router()

router.get('/@me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    return res.status(200).json(user)
  } catch (e) {
    return sendMessage(res, 500, 'Something went wrong, try again later', e)
  }
})

export default router
