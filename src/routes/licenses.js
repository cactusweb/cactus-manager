import express from 'express'
import validate from '../middleware/validate.middleware.js'
import auth from '../middleware/auth.middleware.js'
import License from '../models/manager/License.js'
import { sendMessage } from '../utils/helper.functions.js'
import {
  postValidators,
  patchValidators,
  deleteValidators
} from '../validators/licenses.validator.js'

const router = express.Router()

// const {
//   addLicenseValidators,
//   deleteLicenseValidators,
//   editLicenseValidators
// } = require('../validators/license.validator')

router.post('/', auth, postValidators, validate, async (req, res) => {
  try {
    const { status, expiresIn } = req.body
    const expires = status === 'lifetime' ? undefined : new Date(expiresIn)
    const license = await License.create({
      ...req.body,
      expiresIn: expires,
      owner: req.user.id
    })
    return res.status(200).json(license)
  } catch (e) {
    return sendMessage(res, 500, 'Something went wrong, try again later', e)
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const licenses = await License.find({ owner: req.user.id })
    return res.status(200).json(licenses)
  } catch (e) {
    return sendMessage(res, 500, 'Something went wrong, try again later', e)
  }
})

router.patch('/:id', auth, patchValidators, validate, async (req, res) => {
  try {
    const { user, status, expiresIn, quantity } = req.body
    const expires = status === 'lifetime' ? undefined : new Date(expiresIn)
    const license = await License.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id
      },
      {
        user,
        status,
        expiresIn: expires,
        quantity
      },
      {
        new: true
      }
    )
    return res.status(200).json(license)
  } catch (e) {
    return sendMessage(res, 500, 'Something went wrong, try again later', e)
  }
})

router.delete('/:id', auth, deleteValidators, validate, async (req, res) => {
  try {
    const license = await License.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    })
    if (!license) {
      return sendMessage(res, 400, 'Failed to delete key')
    }
    return res.status(200).json(license)
  } catch (e) {
    return sendMessage(res, 500, 'Something went wrong, try again later', e)
  }
})

export default router
