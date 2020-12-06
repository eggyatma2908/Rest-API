const modelTransaction = require('../models/transaction')
const helper = require('../helpers/helpers')
// const { pagination } = require('../helpers/pagination')

const transaction = {
  getDataTransaction: (req, res) => {
    modelTransaction.getDataTransaction()
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
  getDataTransactionById: (req, res) => {
    const id = req.params.id
    modelTransaction.getDataTransactionById(id)
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
  insertDataTransaction: (req, res) => {
    const { senderId, receiverId, amount, notes } = req.body
    const data = {
      senderId,
      receiverId,
      amount,
      notes
    }
    modelTransaction.insertDataTransaction(data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch(() => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  },
  updateDataTransactionById: (req, res) => {
    const { amount, notes } = req.body
    const id = req.params.id
    const data = {
      amount,
      notes
    }
    modelTransaction.updateDataTransactionById(id, data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch(() => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  },
  deleteDataTransactionById: (req, res) => {
    const id = req.params.id
    modelTransaction.deleteDataTransactionById(id)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch(() => {
        return helper.responseError(res, null, 500, { message: 'Internal server error' })
      })
  }
}

module.exports = transaction
