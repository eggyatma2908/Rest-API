module.exports = {
  responseError: (res, result, status, err) => {
    const resultPrint = {
    }
    resultPrint.status = 'error'
    resultPrint.statusCode = status
    resultPrint.result = result
    resultPrint.err = err || null
    res.status(status)
    res.json(resultPrint)
  },
  responseOk: (res, result, status, err) => {
    const resultPrint = {
    }
    resultPrint.status = 'succes'
    resultPrint.statusCode = status
    resultPrint.result = result
    resultPrint.err = err || null
    res.status(status)
    res.json(resultPrint)
  }
}
