const rateLimit = require('express-rate-limit')

module.exports = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: { message: 'Слишком много неудачных попыток, попробуйте позже' },
  skipSuccessfulRequests: true
})
