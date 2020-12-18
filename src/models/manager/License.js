import { licenseSchema } from 'models/src/manager/License.js'
import { managerConnection } from '../../mongodb.js'

export default managerConnection.model('License', licenseSchema)
