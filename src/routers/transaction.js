const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transaction')
router
  .get('/', transactionController.getDataTransaction)
  .get('/:id', transactionController.getDataTransactionById)
  .post('/', transactionController.insertDataTransaction)
  .patch('/:id', transactionController.updateDataTransactionById)
  .delete('/:id', transactionController.deleteDataTransactionById)
module.exports = router