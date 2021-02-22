import express from 'express'
import auth from '../middleware/auth.middleware.js'
import Plan from '../models/manager/Plan.js'

const router = express.Router()

router.post('/', auth, async (req, res) => {
  try {
    const plan = await Plan.create({ ...req.body, owner: req.user.id }).then(
      result => {
        if (result === null) {
          throw new Error('Unable to create plan')
        }
        return result
      }
    )
    return res.status(201).json(plan)
  } catch (e) {
    return res
      .status(500)
      .json({ error: 'Something went wrong, try again later' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const plan = await Plan.find({
      owner: req.user.id
    }).then(result => {
      if (result === null) {
        throw new Error('Unable to get plans')
      }
      return result
    })
    return res.status(200).json({ ...plan })
  } catch (e) {
    return res
      .status(500)
      .json({ error: 'Something went wrong, try again later' })
  }
})

export default router
