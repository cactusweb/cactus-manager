import exporess from 'express'
import auth from '../middleware/auth.middleware.js'
import Drop from '../models/manager/Drop.js'

const router = exporess.Router()

router.post('', auth, async (req, res) => {
  try {
    const time = new Date(req.body.time)
    const status = new Date() >= time ? 'started' : 'not started'

    const drop = await Drop.create({
      ...req.body,
      status,
      owner: req.user.id
    })
    return res.status(201).json({ ...drop.toObject() })
  } catch (e) {
    return res
      .status(500)
      .json({ error: 'Something went wrong, try again later' })
  }
})

router.get('', auth, async (req, res) => {
  try {
    const { id } = req.user
    const drops = await Drop.find({ owner: id })
    return res.status(200).json(drops)
  } catch (e) {
    return res
      .status(500)
      .json({ error: 'Something went wrong, try again later' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const drop = Drop.findOne({ _id: id, owner: req.user.id }).catch(() => {
      return res
        .status(400)
        .json({ error: "You aren't allowed to stop this drop" })
    })
    return res.status(200).json(drop)
  } catch (e) {
    return res
      .status(500)
      .json({ error: 'Something went wrong, try again later' })
  }
})

router.get('/stop/:id', auth, async (req, res) => {
  try {
    const { id } = req.params

    const drop = await Drop.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      {
        status: 'stoped'
      },
      { new: true }
    ).catch(() => {
      return res
        .status(400)
        .json({ error: "You aren't allowed to stop this drop" })
    })

    return res.status(200).json(drop)
  } catch {
    return res
      .status(500)
      .json({ error: 'Something went wrong, try again later' })
  }
})

export default router
