import mongoose from 'mongoose'
import { managerConnection } from '../../mongodb.js'

export const discordUserSchema = new mongoose.Schema(
  {
    discordId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    accessToken: {
      type: String,
      required: true
    },
    expiresIn: {
      type: Date,
      required: true
    },
    keys: [
      {
        type: String
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default managerConnection.model('DiscordUser', discordUserSchema)
