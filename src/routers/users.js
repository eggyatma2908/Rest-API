const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const { uploadMulter } = require('../middlewares/upload')
const { cacheAllUsers} = require('../middlewares/redis')

router
  .get('/', cacheAllUsers, userController.getDataUsers)
  .get('/:id', userController.getDataUserById)
  .post('/', userController.insertDataUser)
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  .post('/email', userController.sendEmail)
  .patch('/:id', uploadMulter.single('image'), userController.updateDataUser)
  .delete('/:id', userController.deleteDataUserById)
module.exports = router
