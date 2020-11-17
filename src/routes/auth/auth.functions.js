const jwt = require('jsonwebtoken')

const { ACCESS_TOKEN_SECRET } = require('../../config/keys')

module.exports.createJWT = async userId => {
  const options = {
    expiresIn: '1d'
  }
  const accessToken = await jwt.sign({ userId }, ACCESS_TOKEN_SECRET, options)
  return accessToken
}
