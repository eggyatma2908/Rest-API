const modelUsers = require('../models/users')
const helper = require('../helpers/helpers')
const users = {
  getDataUsers: (req, res) => {
    const name = req.query.name
    const phoneNumber = req.query.phoneNumber
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const offset = (page - 1) * limit
    modelUsers.getDataUsers(name, phoneNumber, limit, offset)
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
      .catch((err) => {
        console.log(err)
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
      .catch((err) => {
        console.log(err)
      })
  },
  insertDataUser: (req, res) => {
    const { name, phoneNumber, pin, balance } = req.body
    const data = {
      name,
      phoneNumber,
      pin,
      balance
    }
    modelUsers.insertDataUser(data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateDataUserById: (req, res) => {
    const { name, phoneNumber, pin, balance, updatedAt } = req.body
    const id = req.params.id
    const data = {
      name,
      phoneNumber,
      pin,
      balance,
      updatedAt
    }
    modelUsers.updateDataUserById(id, data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteDataUserById: (req, res) => {
    const id = req.params.id
    modelUsers.deleteDataUserById(id)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = users