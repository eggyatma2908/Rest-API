const express = require('express')
const router = express.Router()
const { getDataTransaction, getDataTransactionById, insertDataTransaction, updateDataTransactionById, deleteDataTransactionById } = require('../controllers/transaction')
const { verifyAccess } = require('../middlewares/auth')

router
  .get('/', verifyAccess, getDataTransaction)
  .get('/:id', verifyAccess, getDataTransactionById)
  .post('/', verifyAccess, insertDataTransaction)
  .patch('/:id', verifyAccess, updateDataTransactionById)
  .delete('/:id', verifyAccess, deleteDataTransactionById)
module.exports = router
