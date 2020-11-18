import development from './development.js'
import production from './production.js'

const config = process.env.NODE_ENV === 'production' ? production : development

export default config
