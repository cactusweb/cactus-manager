const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    expiresIn: {
      type: Date,
      required: true
    }
  },
  { versionKey: false }
)

module.exports = model('User', userSchema)
