import express from 'express'

const router = express.Router()

router.get('', async req => {
  const accessToken = req.query.access_token
  console.log(accessToken)
})

export default router
