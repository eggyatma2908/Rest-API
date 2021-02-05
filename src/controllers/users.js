const modelUsers = require('../models/users')
const helper = require('../helpers/helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const { pagination } = require('../helpers/pagination')
const { uploadMulter } = require('../middlewares/upload')
const sendEmail = require('../helpers/emailVerification')
const uploadSingleImage = uploadMulter.single('photoProfile')
// const redis = require("redis");
// const client = redis.createClient(6379);

const users = {
  registerUser: (req, res) => {
    const id = uuidv4()
    const {
      username,
      email,
      password
    } = req.body

    modelUsers.checkUser(email)
      .then((result) => {
        if (result.length > 0) return helper.responseError(res, null, 401, { message: 'Email already exist' })
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            const data = {
              id,
              username,
              email,
              password: hash
            }
            modelUsers.insertDataUser(data)
              .then(() => {
                return helper.responseOk(res, { message: 'Register succesfuly' }, 200, null)
              })
          })
        })
      })
      .catch ((err) => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  },
  loginUser: (req, res, next) => {
    const { email, password } = req.body
    modelUsers.checkUser(email)
      .then((result) => {
        const user = result[0]
        if (result.length === 0) {
          return helper.responseError(result, null, 402, { error: 'Email has not been registered' })
        }
        if (user.emailVerification === null) {
          return helper.responseError(res, null, 401, { error: 'Email has not been verified' })
        }

        bcrypt.compare(password, user.password, function (err, resCheck) {
          if (resCheck === false) return helper.responseError(res, null, 401, { error: 'Password Wrong' })
          delete user.password

          //accessToken
          jwt.sign({ userID: user.id, email: user.email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '24h' }, function (err, accessToken) {
            // refreshtoken  
            jwt.sign({ userID: user.id, email: user.email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '48h' }, function (err, refreshToken) {
              user.accessToken = accessToken
              user.refreshToken = refreshToken
              return helper.responseOk(res, user, 200, null)
            })
          })
        })
      })
    .catch(() => {
      return helper.responseError(res, null, 500, { message: 'Internal server error' })
    })
  },
  emailVerification: (req, res, next) => {
    const email = req.body.email
    if (!email) {
      helper.responseError(res, null, 404, { message: 'Forbidden: message and email cannot be empty' })
    }
    try {
      sendEmail(email)
      return next()
    } catch (error) {
      helper.responseError(res, null, 500, { message: 'Looks like server having trouble..' })
    }
  },
  getDataUsers: async (req, res, next) => {
    const username = req.query.username
    const phoneNumber = req.query.phoneNumber
    const sortData = req.query.sort || 'id'
    const typeSort = req.query.type || 'ASC'
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 4
    const offset = (page - 1) * limit
    const setPagination = await pagination(limit, page)
    modelUsers.getDataUsers(username, phoneNumber, offset, limit)
      .then(result => {
        const resultUser = result
        const error = {
          message: 'Error not found'
        }
        // client.setex("allUsers", 60*60, JSON.stringify(resultUser));
        if (resultUser.length === 0) {
          return helper.responseError(res, null, 404, error)
        }
        helper.responseOk(res, { pagination: setPagination, users: resultUser }, 200, null)
      })
      .catch((err) => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  },
  getDataUserById: (req, res, next) => {
    const id = req.params.id
    modelUsers.getDataUserById(id)
      .then(result => {
        const resultUser = result
        const error = {
          message: 'Id not found'
        }
        if (resultUser.length === 0) {
          return helper.responseError(res, null, 404, error)
        }
        helper.responseOk(res, resultUser, 200, null)
      })
      .catch((err) => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  },
  insertDataUser: (req, res) => {
    const { username, email, password } = req.body
    const data = {
      username,
      email,
      password
    }
    modelUsers.insertDataUser(data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  },
  editPhone: (req, res) => {
    const { phoneNumber } = req.body
    const id = req.params.id
    const data = {
      phoneNumber
    }
    modelUsers.editPhone(id, data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  },
  updateBalanceSender: (req, res) => {
    const { balance } = req.body
    const id = req.params.id
    const data = {
      balance
    }
    modelUsers.updateBalanceSender(id, data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  },
  updateBalanceReceiver: (req, res) => {
    const { balance } = req.body
    const id = req.params.id
    const data = {
      balance
    }
    modelUsers.updateBalanceReceiver(id, data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  },
  updateImage: (req, res) => {
    uploadSingleImage(req, res, function (err) {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return helper.responseError(res, null, 401, { message: err.message })
        }
        return helper.responseError(res, null, 403, { message: err.message })
      }

      // Everything went fine.
      const file = req.file;
      const id = req.params.id
      const data = {
        photoProfile: `${process.env.BASE_URL}/upload/${file.filename}`
      }
      modelUsers.updateImage(id, data)
      .then(result => {
        helper.responseOk(res, { message: 'Update image success', filename: `${process.env.BASE_URL}/upload/${file.filename}` }, 200, null)
      })
      .catch((error) => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
    })
  },
  deleteDataUserById: (req, res) => {
    const id = req.params.id
    modelUsers.deleteDataUserById(id)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  }
}

module.exports = users
