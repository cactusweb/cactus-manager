const { body } = require('express-validator')

const License = require('../../models/License')

module.exports.addLicenseValidators = [
  body('user', 'Некорректное имя пользователя')
    .exists()
    .trim()
    .notEmpty()
    .matches(/^((.+?)#\d{4})$/),
  body('key', 'Некорректный ключ')
    .exists()
    .trim()
    .notEmpty()
    .matches(/^\w{4}-\w{4}-\w{4}-\w{4}$/)
    .custom(async value => {
      try {
        const license = await License.findOne({ key: value })
        if (license) {
          return Promise.reject(new Error('Данный ключ уже существует'))
        }
        return true
      } catch (e) {
        return Promise.reject(new Error('Неизвестная ошибка'))
      }
    }),
  body('status', 'Некорректный тип ключа')
    .exists()
    .trim()
    .notEmpty()
    .isIn(['lifetime', 'renewal']),
  body('expiresIn', 'Некорректная дата').toDate().isAfter(),
  body('quantity', 'Некорректное количество использований')
    .exists()
    .trim()
    .notEmpty()
    .isInt({ min: 0 })
]

module.exports.editLicenseValidators = [
  body('id', 'Некорректный ID').exists().trim().notEmpty().isMongoId(),
  body('user', 'Некорректное имя пользователя')
    .exists()
    .trim()
    .notEmpty()
    .matches(/^((.+?)#\d{4})$/),
  body('status', 'Некорректный тип ключа')
    .exists()
    .trim()
    .notEmpty()
    .isIn(['lifetime', 'renewal']),
  body('expiresIn', 'Некорректная дата').toDate().isAfter(),
  body('quantity', 'Некорректное количество использований')
    .exists()
    .trim()
    .notEmpty()
    .isInt({ min: 0 })
]

module.exports.deleteLicenseValidators = [
  body('id', 'Некорректный ID').exists().trim().notEmpty().isMongoId()
]
