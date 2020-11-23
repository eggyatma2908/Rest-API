const modelStatus = require('../models/status')
const helper = require('../helpers/helpers')
const status = {
  getDataStatus: (req, res) => {
    modelStatus.getDataStatus()
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getDataStatusById: (req, res) => {
    const id = req.params.id
    modelStatus.getDataStatusById(id)
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
  insertDataStatus: (req, res) => {
    const { status } = req.body
    const data = {
      status
    }
    modelStatus.insertDataStatus(data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateDataStatusById: (req, res) => {
    const { status } = req.body
    const id = req.params.id
    const data = {
      status
    }
    modelStatus.updateDataStatusById(id, data)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteDataStatusById: (req, res) => {
    const id = req.params.id
    modelStatus.deleteDataStatusById(id)
      .then(result => {
        helper.responseOk(res, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = status