const { body } = require('express-validator')

const RegKey = require('../models/RegKey')
const User = require('../models/User')

const { ADMIN_LOGIN, ADMIN_PASSWORD } = require('../config/keys')

module.exports.signUpValidators = [
  body('name', 'Некорректное имя').exists().trim().notEmpty(),
  body('email', 'Некорректный email')
    .exists()
    .trim()
    .normalizeEmail()
    .isEmail()
    .custom(async value => {
      try {
        const candidate = await User.findOne({ email: value })
        if (candidate) {
          return Promise.reject(new Error('Данный пользователь уже существует'))
        }
        return true
      } catch (e) {
        return Promise.reject(new Error('Неизвестная ошибка'))
      }
    }),
  body('password', 'Некорректный пароль').exists().trim().isLength({ min: 6 }),
  body('key', 'Некорректный ключ')
    .exists()
    .trim()
    .custom(async value => {
      try {
        const regKey = await RegKey.findOne({ key: value })
        if (!regKey) {
          return Promise.reject(new Error('Некорректный ключ'))
        }
        return true
      } catch (e) {
        return Promise.reject(new Error('Неизвестная ошибка'))
      }
    })
]

module.exports.regKeyValidators = [
  body('key', 'Некорректный ключ')
    .exists()
    .trim()
    .notEmpty()
    .matches(/^\w{4}-\w{4}-\w{4}-\w{4}$/)
    .custom(async value => {
      try {
        const regKey = await RegKey.findOne({ key: value })
        if (regKey) {
          return Promise.reject(new Error('Данный ключ уже существует'))
        }
        return true
      } catch (e) {
        return Promise.reject(new Error('Неизвестная ошибка'))
      }
    })
]

module.exports.signInValidators = [
  body('email', 'Введите email')
    .exists()
    .trim()
    .notEmpty()
    .normalizeEmail()
    .isEmail(),
  body('password', 'Введите пароль').exists().trim().notEmpty()
]

module.exports.adminValidators = [
  body('login', 'Неверные данные')
    .exists()
    .trim()
    .notEmpty()
    .equals(ADMIN_LOGIN),
  body('password', 'Неверные данные')
    .exists()
    .trim()
    .notEmpty()
    .equals(ADMIN_PASSWORD)
]
