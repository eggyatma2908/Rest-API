const express = require('express')
const router = express.Router()
const { getDataUsers, getDataUserById, insertDataUser, emailVerification, registerUser, loginUser, editPhone, editPin, updateBalanceSender, updateBalanceReceiver, updateImage, deleteDataUserById } = require('../controllers/users')
const { verifyAccess } = require('../middlewares/auth')
// const { cacheAllUsers} = require('../middlewares/redis')

router
  .get('/', verifyAccess, getDataUsers)
  .get('/:id', verifyAccess, getDataUserById)
  .post('/', verifyAccess, insertDataUser)
  .post('/register', emailVerification, registerUser)
  .post('/login', loginUser)
  .patch('/:id', verifyAccess, editPhone)
  .patch('/editpin/:id', editPin)
  .patch('/balancesender/:id', verifyAccess, updateBalanceSender)
  .patch('/balancereceiver/:id', verifyAccess, updateBalanceReceiver)
  .patch('/profile/:id', updateImage)
  .delete('/:id', verifyAccess, deleteDataUserById)
module.exports = router
