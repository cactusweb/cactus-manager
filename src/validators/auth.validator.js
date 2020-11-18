import validator from 'express-validator'
import User from '../models/manager/User.js'
import Key from '../models/manager/Key.js'
import { isSame } from '../utils/helper.functions.js'

const { body } = validator

export const signInValidators = [
  body('email', 'Enter your email')
    .exists()
    .trim()
    .notEmpty()
    .normalizeEmail()
    .isEmail()
    .custom(async value => {
      try {
        const candidate = await User.findOne({
          email: value,
          expiresIn: { $gt: Date.now() }
        })
        if (!candidate) {
          return Promise.reject(new Error('Incorrect data'))
        }
      } catch (e) {
        return Promise.reject(new Error('Unknown error'))
      }
    }),
  body('password', 'Enter password')
    .exists()
    .trim()
    .notEmpty()
    .custom(async (value, { req }) => {
      try {
        const { password } = await User.findOne({ email: req.body.email })
        if (!isSame(value, password)) {
          return Promise.reject(new Error('Incorrect data'))
        }
      } catch (e) {
        return Promise.reject(new Error('Unknown error'))
      }
    })
]

export const signUpValidators = [
  body('name', 'Incorrect name').exists().trim().notEmpty(),
  body('email', 'Incorrect email')
    .exists()
    .trim()
    .normalizeEmail()
    .isEmail()
    .custom(async value => {
      try {
        const candidate = await User.findOne({ email: value })
        if (candidate) {
          return Promise.reject(new Error('This user already exists'))
        }
      } catch (e) {
        return Promise.reject(new Error('Unknown error'))
      }
    }),
  body('password', 'Incorrect password').exists().trim().isLength({ min: 6 }),
  body('key', 'Incorrect key')
    .exists()
    .trim()
    .custom(async value => {
      try {
        const key = await Key.findOne({ key: value })
        if (!key) {
          return Promise.reject(new Error('Incorrect key'))
        }
        return true
      } catch (e) {
        return Promise.reject(new Error('Unknown error'))
      }
    })
]
