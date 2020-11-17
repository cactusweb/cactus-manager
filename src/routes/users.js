const router = require('express').Router()

const userAuth = require('../middleware/user.middleware')

const User = require('../models/User')

router.get('/@me', userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Не удалось получить информацию о пользователе' })
    }
    return res.status(200).json(user)
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

module.exports = router
