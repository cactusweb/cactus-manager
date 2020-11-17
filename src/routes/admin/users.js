const router = require('express').Router()

const adminAuth = require('../../middleware/admin.middleware')

const User = require('../../models/User')

const {
  deleteUserValidators,
  patchUserValidators
} = require('../../utils/validators/user.validator')
const { hasError } = require('../../middleware/validate.middleware')

router.get('/', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password')
    return res.status(200).json(users)
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.delete(
  '/',
  adminAuth,
  deleteUserValidators,
  hasError,
  async (req, res) => {
    try {
      const { id } = req.body
      const user = await User.findByIdAndDelete(id).select('-password')
      if (!user) {
        return res
          .status(400)
          .json({ message: 'Не удалось удалить пользователя' })
      }
      return res.status(200).json(user)
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
  }
)

router.patch(
  '/',
  adminAuth,
  patchUserValidators,
  hasError,
  async (req, res) => {
    try {
      const { id, expiresIn } = req.body
      const user = await User.findByIdAndUpdate(
        id,
        { expiresIn },
        { new: true }
      ).select('-password')
      if (!user) {
        return res
          .status(400)
          .json({ message: 'Не удалось изменить пользователя' })
      }
      return res.status(200).json(user)
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
  }
)

module.exports = router
