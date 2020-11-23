const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
router
  .get('/', userController.getDataUsers)
  .get('/:id', userController.getDataUserById)
  .post('/', userController.insertDataUser)
  .put('/:id', userController.updateDataUserById)
  .delete('/:id', userController.deleteDataUserById)
module.exports = router