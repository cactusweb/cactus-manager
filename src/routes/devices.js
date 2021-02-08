import express from 'express'

import validate from '../middleware/validate.middleware.js'
import License from '../models/manager/License.js'
import User from '../models/manager/User.js'
import {
  postValidators,
  deleteValidators
} from '../validators/devices.validator.js'
import { sendMessage } from '../utils/helper.functions.js'

const router = express.Router()

router.post('/', postValidators, validate, async (req, res) => {
  try {
    const { key, device, id } = req.body
    const user = await User.findById(id)
      .then(result => result)
      .catch(() => {
        return null
      })

    if (user === null) {
      return sendMessage(res, 400, 'Wrong ID')
    }

    const license = await License.findOne({ key })

    if (license.owner.toString() !== id) {
      return sendMessage(res, 400, 'Wrong key')
    }

    if (license.devices.includes(device)) {
      return sendMessage(res, 200, 'Added')
    }

    if (license.devices.length < license.quantity || !license.quantity) {
      if (!license.devices.includes(device)) {
        license.devices.push(device)
      }
    } else {
      return sendMessage(res, 400, 'Exceeded the maximum number of uses')
    }

    await license.save()
    return sendMessage(res, 200, 'Added')
  } catch (e) {
    return sendMessage(res, 500, e)
  }
})

router.delete('/', deleteValidators, validate, async (req, res) => {
  try {
    const { key, id } = req.body
    const user = await User.findById(id)
      .then(result => result)
      .catch(() => {
        return null
      })
    if (!user) {
      return sendMessage(res, 400, 'Wrong ID')
    }

    const test = await License.findOne({ key })

    if (test.owner.toString() !== id) {
      return sendMessage(res, 400, 'Wrong key')
    }

    const license = await License.findOneAndUpdate(
      { key },
      { devices: [] },
      { new: true }
    )
    if (!license) {
      return sendMessage(res, 400, 'Failed to reset uses')
    }
    return sendMessage(res, 200, 'Reset')
  } catch (e) {
    return sendMessage(res, 500, 'Something went wrong, try again later', e)
  }
})

export default router
