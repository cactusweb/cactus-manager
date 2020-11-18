import { userSchema } from 'models/src/manager/User.js'
import { managerConnection } from '../../mongodb.js'

export default managerConnection.model('User', userSchema)
