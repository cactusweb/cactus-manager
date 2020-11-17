const { body } = require('express-validator')

module.exports.deleteUserValidators = [
  body('id', 'Некорректный ID').exists().trim().notEmpty().isMongoId()
]

module.exports.patchUserValidators = [
  body('id', 'Некорректный ID').exists().trim().notEmpty().isMongoId(),
  body('expiresIn', 'Некорректная дата')
    .exists()
    .trim()
    .notEmpty()
    .toDate()
    .isAfter()
]
