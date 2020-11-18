import validator from 'express-validator'
import License from '../models/manager/License.js'

const { body, param } = validator

export const postValidators = [
  body('user', 'Incorrect username')
    .exists()
    .trim()
    .notEmpty()
    .matches(/^((.+?)#\d{4})$/),
  body('key', 'Incorrect key')
    .exists()
    .trim()
    .notEmpty()
    .matches(/^\w{4}-\w{4}-\w{4}-\w{4}$/)
    .custom(async value => {
      try {
        const license = await License.findOne({ key: value })
        if (license) {
          return Promise.reject(new Error('The given key already exists'))
        }
      } catch (e) {
        return Promise.reject(new Error('Unknown error'))
      }
    }),
  body('status', 'Incorrect key type')
    .exists()
    .trim()
    .notEmpty()
    .isIn(['lifetime', 'renewal']),
  body('expiresIn', 'Incorrect date').toDate().isAfter(),
  body('quantity', 'Incorrect number of uses')
    .exists()
    .trim()
    .notEmpty()
    .isInt({ min: 0 })
]

export const patchValidators = [
  param('id', 'Incorrect ID').exists().trim().notEmpty().isMongoId(),
  body('user', 'Incorrect username')
    .exists()
    .trim()
    .notEmpty()
    .matches(/^((.+?)#\d{4})$/),
  body('status', 'Incorrect key type')
    .exists()
    .trim()
    .notEmpty()
    .isIn(['lifetime', 'renewal']),
  body('expiresIn', 'Incorrect date').toDate().isAfter(),
  body('quantity', 'Incorrect number of uses')
    .exists()
    .trim()
    .notEmpty()
    .isInt({ min: 0 })
]

export const deleteValidators = [
  param('id', 'Incorrect ID').exists().trim().notEmpty().isMongoId()
]
