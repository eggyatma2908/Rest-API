const modelUsers = require('../models/users')
const helper = require('../helpers/helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const { sendEmail } = require('../helpers/email')

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
  },
  loginUser: (req, res) => {
    const { email, password } = req.body
    modelUsers.checkUser(email)
      .then((result) => {
        if (result.length === 0) return helper.responseError(res, null, 403, { message: 'Email has not been registered' })
        const user = result[0]

        bcrypt.compare(password, user.password, function (err, resCheck) {
          if (resCheck === false) return helper.responseError(res, null, 401, { error: 'Wrong password' })
          delete user.password

          jwt.sign({ userID: user.id, email: user.email, roleID: user.role_id }, process.env.SECRET_KEY, { expiresIn: '1h' }, function (err, token) {
            user.token = token
            return helper.responseOk(res, user, 200, null)
          })
        })
      })
  },
  sendEmail: (req, res) => {
    const email = req.body.email
    const message = req.body.message
    sendEmail(email, message)
      .then(() => {
        return helper.responseOk(res, { message: 'Send email success' }, 200, null)
      })
      .catch(() => {
        return helper.responseError(res, null, 500, { message: 'Error send email' })
      })
  },
  getDataUsers: (req, res) => {
    const username = req.query.username
    const email = req.query.email
    modelUsers.getDataUsers(username, email)
      .then(result => {
        const resultUser = result
        const error = {
          message: 'Error not found'
        }
        if (resultUser.length === 0) {
          return helper.responseError(res, null, 404, error)
        }
        helper.responseOk(res, resultUser, 200, null)
      })
      .catch(() => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  },
  getDataUserById: (req, res) => {
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
      .catch(() => {
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
      .catch(() => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  },
  updateDataUser: (req, res) => {
    const { phoneNumber } = req.body
    const id = req.params.id
    const data = {
      phoneNumber,
      image: `${process.env.BASE_URL}/upload/${req.file.filename}`
    }
    modelUsers.updateDataUser(id, data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch(() => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  },
  deleteDataUserById: (req, res) => {
    const id = req.params.id
    modelUsers.deleteDataUserById(id)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch(() => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  }
}

module.exports = users
