import mongoose from 'mongoose'
import { managerConnection } from '../../mongodb.js'

export const DropSchema = new mongoose.Schema({
  quantity: {
    required: true,
    type: Number
  },
  password: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Number
  },
  status: {
    required: true,
    type: String,
    enum: ['not started', 'started', 'stoped']
  },
  time: {
    required: true,
    type: Date
  },
  plan: {
    required: true,
<<<<<<< HEAD
    type: Number
=======
    ref: 'Plan',
    type: mongoose.Types.ObjectId
>>>>>>> 526e89001817da23209f7a17e8dcc69e92d4b6f1
  },
  owner: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Owner'
  }
})

export default managerConnection.model('Drop', DropSchema)
