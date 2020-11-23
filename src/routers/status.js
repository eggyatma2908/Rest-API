const express = require('express')
const router = express.Router()
const statusController = require('../controllers/status')
router
  .get('/', statusController.getDataStatus)
  .get('/:id', statusController.getDataStatusById)
  .post('/', statusController.insertDataStatus)
  .put('/:id', statusController.updateDataStatusById)
  .delete('/:id', statusController.deleteDataStatusById)
module.exports = router