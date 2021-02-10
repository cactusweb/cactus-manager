import express from 'express'
import { checkDiscordUserAuth } from '../middleware/auth.middleware.js'
import DiscordUser from '../models/manager/DiscordUser.js'

const router = express.Router()

router.post('', checkDiscordUserAuth, async (req, res) => {
  const { discordId } = req.user
  const { key } = req.body

  await DiscordUser.findOne({ discordId }, (err, discordUser) => {
    if (err) {
      return res
        .status(400)
        .json({ error: 'Не удалось получить информацию о ключах' })
    }
    if (discordUser.keys.includes(key)) {
      return res.status(400).json({ error: 'Такой ключ уже существует' })
    }

    discordUser.keys.append(key)
    return res.status(200).json({ message: 'Успешно добавлено' })
  })
})

export default router
