const router = require('express').Router()

const { hasError } = require('../middleware/validate.middleware')
const userAuth = require('../middleware/user.middleware')

const License = require('../models/License')

const {
  addLicenseValidators,
  deleteLicenseValidators,
  editLicenseValidators
} = require('../utils/validators/license.validator')

router.post('/', userAuth, addLicenseValidators, hasError, async (req, res) => {
  try {
    const { user, key, status, expiresIn, quantity } = req.body
    const license = await License.create({
      user,
      key,
      status,
      expiresIn: status === 'lifetime' ? undefined : expiresIn,
      quantity,
      owner: req.user.userId
    })
    return res.json(license)
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.get('/', userAuth, async (req, res) => {
  try {
    const licenses = await License.find({ owner: req.user.userId })
    return res.status(200).json(licenses)
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.patch(
  '/',
  userAuth,
  editLicenseValidators,
  hasError,
  async (req, res) => {
    try {
      const { id, user, status, expiresIn, quantity } = req.body
      const license = await License.findOneAndUpdate(
        {
          owner: req.user.userId,
          _id: id
        },
        {
          user,
          status,
          expiresIn: status === 'lifetime' ? undefined : expiresIn,
          quantity
        },
        {
          new: true
        }
      )
      return res.status(200).json(license)
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
  }
)

router.delete(
  '/',
  userAuth,
  deleteLicenseValidators,
  hasError,
  async (req, res) => {
    try {
      const license = await License.findOneAndDelete({
        owner: req.user.userId,
        _id: req.body.id
      })
      if (!license) {
        return res.status(400).json({ message: 'Не удалось удалить лицензию' })
      }
      return res.status(200).json(license)
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
  }
)

module.exports = router
