import path from 'path'
import express from 'express'
import fetch from 'node-fetch'
import { fileURLToPath } from 'url'
import config from '../config/config.js'
import {
  createDiscordJWT,
  discordUserIsExists,
  getDiscordUserData,
  toNextWeek
} from '../utils/helper.functions.js'
import DiscordUser from '../models/manager/DiscordUser.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const router = express.Router()

router.get('/', (req, res) => {
  res.redirect(
    `https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1%2Fdiscord%2Fauth&response_type=code&scope=email%20guilds.join%20identify%20guilds`
  )
})

router.get('/page', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '..', 'test', 'test.html'))
})

router.get('/auth', async (req, res) => {
  try {
    const code = String(req.query.code)

    const payload = new URLSearchParams()

    payload.append('client_id', config.CLIENT_ID)
    payload.append('client_secret', config.CLIENT_SECRET)
    payload.append('grant_type', 'authorization_code')
    payload.append('code', code)
    payload.append('redirect_uri', config.DISCORD_REDIRECT)
    payload.append('scope', 'identify email guilds guilds.join')

    const option = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload
    }

    const discordAccessToken = await fetch(
      'https://discordapp.com/api/oauth2/token',
      option
    )
      .then(result => result.json())
      .then(async result => result.access_token)
      .catch(() => {
        throw new Error('Unable to get Discord Token')
      })

    const discordUserData = await getDiscordUserData(discordAccessToken)
      .then(result => result)
      .catch(() => {
        throw new Error('Unable to get discordUserData')
      })

    const isExists = discordUserIsExists(discordUserData.discordId)
      .then(result => result)
      .catch(() => {
        throw new Error('Unable to check is discordUser exists in mongo')
      })

    if (!isExists) {
      console.log(isExists)
      await DiscordUser.create({
        discordId: discordUserData.id,
        name: `${discordUserData.username}#${discordUserData.discriminator}`,
        accessToken: discordAccessToken,
        expiresIn: toNextWeek()
      })
    }

    const accessToken = createDiscordJWT(discordUserData.id)

    return res.status(200).json({ accessToken })
  } catch (e) {
    console.log(e)
    return res.status(401).json({ error: 'Не удалось авторизоваться' })
  }
})

export default router
