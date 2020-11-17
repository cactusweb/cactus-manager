const router = require('express').Router()

const adminAuth = require('../../middleware/admin.middleware')

const { regKeyValidators } = require('../../utils/validators')
const { hasError } = require('../../middleware/validate.middleware')

const RegKey = require('../../models/RegKey')

router.post('/', adminAuth, regKeyValidators, hasError, async (req, res) => {
  try {
    const regKey = await RegKey.create(req.body)
    return res.status(200).json({ key: regKey.key })
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

module.exports = router
