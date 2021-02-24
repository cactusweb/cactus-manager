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
    ref: 'Plan',
    type: mongoose.Types.ObjectId
  },
  owner: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Owner'
  }
})

export default managerConnection.model('Drop', DropSchema)
