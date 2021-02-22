import mongoose from 'mongoose'
import { managerConnection } from '../../mongodb.js'

export const PlanSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  quantity: {
    required: true,
    type: Number
  },
  unbindable: {
    required: true,
    type: Boolean
  },
  status: {
    type: String,
    required: true,
    enum: ['lifetime', 'renewal']
  },
  expiresIn: {
    type: Date,
    required() {
      return this.status === 'renewal'
    }
  },
  renewPrice: {
    type: Number,
    required() {
      return this.status === 'renewal'
    }
  },
  roles: [
    {
      required: true,
      type: String
    }
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'Owner',
    required: true
  }
})

export default managerConnection.model('Plan', PlanSchema)
