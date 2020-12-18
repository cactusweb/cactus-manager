import rateLimit from 'express-rate-limit'

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: { message: 'Too many failed attempts, please try again later' },
  skipSuccessfulRequests: true
})
