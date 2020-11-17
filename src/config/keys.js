const production = require('./production')
const development = require('./development')

let config = {}

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  config = { ...production }
} else {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  config = { ...development }
}
module.exports = {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  ...config
}
