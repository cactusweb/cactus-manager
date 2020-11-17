const { body } = require('express-validator')

const License = require('../../models/License')

module.exports.addDeviceValidators = [
  body('key', 'Некорректный ключ')
    .exists()
    .trim()
    .notEmpty()
    .matches(/^\w{4}-\w{4}-\w{4}-\w{4}$/)
    .custom(async value => {
      try {
        const license = await License.findOne({ key: value })
        if (!license) {
          return Promise.reject(new Error('Данный ключ не существует'))
        }
        return true
      } catch (e) {
        return Promise.reject(new Error('Неизвестная ошибка'))
      }
    }),
  body('device', 'Введите ID устройства').exists().trim().notEmpty()
]

module.exports.deleteDeviceValidators = [
  body('key', 'Некорректный ключ')
    .exists()
    .trim()
    .notEmpty()
    .matches(/^\w{4}-\w{4}-\w{4}-\w{4}$/)
    .custom(async value => {
      try {
        const license = await License.findOne({ key: value })
        if (!license) {
          return Promise.reject(new Error('Данный ключ не существует'))
        }
        return true
      } catch (e) {
        return Promise.reject(new Error('Неизвестная ошибка'))
      }
    })
]
