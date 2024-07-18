const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const baseUrl = '/api/v1'
const app = express()

// 1. GLOBAL MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in 1 hour!'
})

app.use('/api', limiter)

app.use(express.json())

app.use(express.static(`${__dirname}/public`))

app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString()
  // console.log(req.headers)
  next()
})

// 2. MOUNTING THE ROUTES
app.use(`${baseUrl}/tours`, tourRouter)
app.use(`${baseUrl}/users`, userRouter)

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404)
})

app.use(globalErrorHandler)

module.exports = app
