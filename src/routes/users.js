import express from 'express'
import * as fs from 'fs'
import path from 'path'
import multer from 'multer'
import User from '../models/manager/User.js'
import auth from '../middleware/auth.middleware.js'
import { sendMessage } from '../utils/helper.functions.js'
import Image from '../models/manager/Image.js'

const router = express.Router()

router.get('/@me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    return res.status(200).json(user)
  } catch (e) {
    return sendMessage(res, 500, 'Something went wrong, try again later', e)
  }
})

router.patch('', auth, async (req, res) => {
  const updateData = req.body
  const user = await User.findOneAndUpdate({ _id: req.user.id }, updateData, {
    new: true
  })
  if (!user) {
    res.status(500).json({ error: 'Unable to update user info' })
  }
  res.status(200).json(user)
})

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}`)
//   }
// })
// const upload = multer({ storage })

// router.post('/avatar', auth, upload.single('image'), async (req, res) => {
//   await Image.create({
//     owner: req.user.id,
//     img: {
//       data: fs.readFileSync(
//         path.join(`${__dirname}/uploads/${req.file.filename}`)
//       ),
//       contentType: 'image/png'
//     }
//   })
// })

export default router
