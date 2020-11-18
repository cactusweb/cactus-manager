import mongoose from 'mongoose'

import config from './config/config.js'

const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

export const managerConnection = mongoose.createConnection(
  config.MANAGER_MONGODB_URI,
  mongodbOptions
)
