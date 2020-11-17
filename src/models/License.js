const { Schema, model, Types } = require('mongoose')

const schema = new Schema(
  {
    owner: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    user: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      required: true,
      enum: ['lifetime', 'renewal']
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    expiresIn: Date,
    quantity: {
      type: Number,
      required: true
    },
    devices: [String]
  },
  { versionKey: false }
)

module.exports = model('License', schema)
