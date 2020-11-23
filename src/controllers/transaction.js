const modelTransaction = require('../models/transaction')
const helper = require('../helpers/helpers')
const transaction = {
  getDataTransaction: (req, res) => {
    modelTransaction.getDataTransaction()
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getDataTransactionById: (req, res) => {
    const id = req.params.id
    modelTransaction.getDataTransactionById(id)
      .then(result => {
        const error = {
          message: 'Id not found'
        }
        if (result.length === 0) {
          return helper.responseError(res, null, 404, error)
        }
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertDataTransaction: (req, res) => {
    const { senderName, senderPhone, receiverId, amount, notes, statusId } = req.body
    const data = {
      senderName,
      senderPhone,
      receiverId,
      amount,
      notes,
      statusId
    }
    modelTransaction.insertDataTransaction(data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateDataTransactionById: (req, res) => {
    const { senderName, senderPhone, receiverId, amount, notes, statusId } = req.body
    const id = req.params.id
    const data = {
      senderName,
      senderPhone,
      receiverId,
      amount,
      notes,
      statusId
    }
    modelTransaction.updateDataTransactionById(id, data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteDataTransactionById: (req, res) => {
    const id = req.params.id
    modelTransaction.deleteDataTransactionById(id)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = transaction