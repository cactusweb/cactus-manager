const bcrypt = require('bcryptjs')

const router = require('express').Router()

const {
  signUpValidators,
  signInValidators,
  adminValidators
} = require('../../utils/validators')
const { createJWT } = require('./auth.functions')

const { hasError } = require('../../middleware/validate.middleware')
const limitor = require('../../middleware/limit.middleware')

const User = require('../../models/User')
const RegKey = require('../../models/RegKey')

const { BCRYPT_SALT, ADMIN_LOGIN } = require('../../config/keys')

router.post('/signup', signUpValidators, hasError, async (req, res) => {
  try {
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    const { name, email, password, key } = req.body
    await RegKey.findOneAndDelete({ key })
    const user = await new User({
      name,
      email,
      password: await bcrypt.hash(password, BCRYPT_SALT),
      expiresIn: nextMonth
    }).save()
    const accessToken = await createJWT(user.id)
    return res.status(200).json({ accessToken })
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.post('/signin', signInValidators, hasError, async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email, expiresIn: { $gt: Date.now() } })
    const areSame = user ? await bcrypt.compare(password, user.password) : false
    if (!user || !areSame) {
      return res.status(400).json({ message: 'Неверные данные' })
    }
    const accessToken = await createJWT(user.id)
    return res.status(200).json({ accessToken })
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.post('/admin', adminValidators, limitor, hasError, async (req, res) => {
  try {
    const accessToken = await createJWT(ADMIN_LOGIN)
    return res.status(200).json({ accessToken })
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

module.exports = router
