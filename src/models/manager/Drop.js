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
  unbindable: {
    type: Boolean
  },
  status: {
    required: true,
    type: String
  },
  roles: [
    {
      required: true,
      type: String
    }
  ],
  time: {
    required: true,
    type: Date
  },
  licenseQuantity: {
    required: true,
    type: Number
  }
  owner: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Owner'
  }
})

export default managerConnection.model('Drop', DropSchema)
