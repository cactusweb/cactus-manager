const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true
    }
  },
  { versionKey: false }
)

module.exports = model('RegKey', schema)
