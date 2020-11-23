require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')
const routerUsers = require('./src/routers/users')
const routerTransaction = require('./src/routers/transaction')
const routerStatus = require('./src/routers/status')
const bodyParser = require('body-parser')
const helper = require('./src/helpers/helpers')

// membuat middleware
const mymiddleware = (req, res, next) => {
  console.log('menjalankan my middleware')
  // res.send('mymiddleware')
  next()
}

// cors
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// add morgan
app.use(morgan('dev'))

// add mymiddleware
app.use(mymiddleware)

// menggunakan router
app.use('/users', routerUsers)
app.use('/transaction', routerTransaction)
app.use('/status', routerStatus)

app.use('*', (req, res) => {
  const error = {
    message: 'URL not found'
  }
  helper.responseError(res, null, 404, error)
})

app.listen(PORT, () => console.log(`server is running port ${PORT}`))