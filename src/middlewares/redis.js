const helpers = require('../helpers/helpers')
// const redis = require('redis')
// const client = redis.createClient(6379)

exports.cacheAllUsers =(req, res, next) =>{
  client.get("allUsers", function (err, data) {

    if (data !== null){
      const result = JSON.parse(data)
      return helpers.responseOk(res, result, 200, null)
    } else {
      next()
    }
  });
}

exports.delCacheAllUsers = (req, res, nex) =>{
  client.del("allUsers")
  next()
}
