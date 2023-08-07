const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const baseUrl = '/api/v1'
const app = express()

// 1. MIDDLEWARES
app.use(morgan('dev'))

app.use(express.json())

// the 3 arguments below, req, res, next, can be called whatever you want, but they must be in this order
// what you see below is common naming convention
app.use((req, res, next) => {
  console.log('Hello from the middleware 🤗')
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// 2. MOUNTING THE ROUTES
app.use(`${baseUrl}/tours`, tourRouter)
app.use(`${baseUrl}/users`, userRouter)

module.exports = app
