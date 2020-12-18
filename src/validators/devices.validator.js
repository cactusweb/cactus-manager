import validator from 'express-validator'
import License from '../models/manager/License.js'

const { body } = validator

export const postValidators = [
  body('key', 'Incorrect key')
    .exists()
    .trim()
    .notEmpty()
    .matches(/^\w{4}-\w{4}-\w{4}-\w{4}$/)
    .custom(async value => {
      try {
        const license = await License.findOne({ key: value })
        if (!license) {
          return Promise.reject(new Error('The given key does not exist'))
        }
        if (license.expiresIn < Date.now()) {
          return Promise.reject(new Error('Key expired'))
        }
      } catch (e) {
        return Promise.reject(new Error('Unknown error'))
      }
    }),
  body('device', 'Enter device ID').exists().trim().notEmpty()
]

export const deleteValidators = [
  body('key', 'Incorrect key')
    .exists()
    .trim()
    .notEmpty()
    .matches(/^\w{4}-\w{4}-\w{4}-\w{4}$/)
    .custom(async value => {
      try {
        const license = await License.findOne({ key: value })
        if (!license) {
          return Promise.reject(new Error('The given key does not exist'))
        }
      } catch (e) {
        return Promise.reject(new Error('Unknown error'))
      }
    })
]
