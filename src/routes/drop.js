import exporess from 'express'
import bcrypt from 'bcryptjs'
import auth from '../middleware/auth.middleware.js'
import Drop from '../models/manager/Drop.js'
import config from '../config/config.js'

const router = exporess.Router()

router.post('', auth, async (req, res) => {
  try {
    const time = new Date(req.body.time)
    const status = new Date() >= time ? 'started' : 'not started'

    const drop = await Drop.create({
      ...req.body,
      // password: await bcrypt.hash(req.body.password, config.SALT),
      status
    })
    return res.status(201).json({ ...drop })
  } catch (e) {
    return res
      .status(500)
      .json({ error: 'Something went wrong, try again later' })
  }
})

export default router
