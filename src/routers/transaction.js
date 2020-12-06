const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transaction')
const { verifyAccess } = require('../middlewares/auth')
router
  .get('/', verifyAccess, transactionController.getDataTransaction)
  .get('/:id', verifyAccess, transactionController.getDataTransactionById)
  .post('/', verifyAccess, transactionController.insertDataTransaction)
  .patch('/:id', verifyAccess, transactionController.updateDataTransactionById)
  .delete('/:id', verifyAccess, transactionController.deleteDataTransactionById)
module.exports = router
