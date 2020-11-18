import { keySchema } from 'models/src/manager/Key.js'
import { managerConnection } from '../../mongodb.js'

export default managerConnection.model('Key', keySchema)
