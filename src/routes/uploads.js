import express from 'express'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
import { fileUpload } from '../middleware/uploads.middleware.js'
import auth from '../middleware/auth.middleware.js'
import User from '../models/manager/User.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const router = express.Router()

const isAvailableFileFormat = file => {
  const filetypes = /jpeg|png|jpg/
  const extname = path.extname(file.name).toLowerCase()
  const { mimetype } = file
  return filetypes.test(extname) && filetypes.test(mimetype)
}
const uploadFile = async (file, dirname) => {
  const fileName =
    crypto.randomBytes(8).toString('hex') + path.extname(file.name)
  const filePath = path.join(__dirname, '..', '..', 'uploads', dirname)
  await file.mv(path.join(filePath, fileName))
  return path.join(`/${dirname}`, fileName)
}

router.post('/:dirname', auth, fileUpload, async (req, res) => {
  try {
    const { dirname } = req.params
    if (!req.files) {
      return res.status(400).json({ error: 'missing file' })
    }
    const { file } = req.files
    if (Array.isArray(file)) {
      return res.status(400).json({ error: 'invalid number of files' })
    }
    if (!isAvailableFileFormat(file)) {
      return res.status(400).json({ error: 'Invalid format' })
    }
    const filePath = await uploadFile(file, dirname)
    await User.findByIdAndUpdate(req.user.id, { avatar: filePath })
    return res.status(201).json({ filePath })
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ error: 'Something went wrong, try again later' })
  }
})

export default router
