import validator from 'express-validator'
import { sendMessage } from '../utils/helper.functions.js'

const { validationResult } = validator

export default (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return sendMessage(res, 400, errors.array()[0].msg)
  }
  return next()
}
