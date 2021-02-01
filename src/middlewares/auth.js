const jwt = require('jsonwebtoken')
const helper = require('../helpers/helpers')

exports.verifyAccess = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]
  
  if (!accessToken) {
    return helper.responseError(res, null, 401, {
      message: 'Server, need token'
    })
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, function (err, results) {
    if(!err){
      req.user = results
      return next()
    }
    if (err) {
      console.log(err)
      if (err.name === 'JsonWebTokenError') {
        return helper.responseError(res, null, 401, {
          message: 'Invalid token'
        })
      } else if (err.name === 'TokenExpiredError') {
        return helper.responseError(res, null, 401, {
          message: 'Token expired'
        })
      }
    }
    // req.userID = decoded.userID
    // req.roleID = decoded.roleID
    // next()
  })
}
