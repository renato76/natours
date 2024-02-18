const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const baseUrl = '/api/v1'
const app = express()

// 1. MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// 2. MOUNTING THE ROUTES
app.use(`${baseUrl}/tours`, tourRouter)
app.use(`${baseUrl}/users`, userRouter)

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`
  })
})

module.exports = app
