import mongoose from 'mongoose'
import { managerConnection } from '../../mongodb.js'

export const imageSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
    unique: true
  },
  img: { data: Buffer, contentType: String }
})

export default managerConnection.model('Image', imageSchema)
