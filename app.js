const path = require('path')
const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')

const baseUrl = '/api/v1'
const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

// 1. GLOBAL MIDDLEWARE

// Set security HTTP headers
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in 1 hour!'
})

app.use('/api', limiter)

// Body parser, reading data from bodyinto req.body
app.use(express.json({ limit: '10kb' }))

// Data sanatization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against cross site scripting attacks
app.use(xss())

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
)

// Test middleware 
app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString()
  // console.log(req.headers)
  next()
})

app.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
    user: 'Jonas'
  })
})

app.get('/overview', (req, res) => {
  res.status(200).render('overview', {
    title: 'All tours'
  })
})

app.get('/tour', (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour'
  })
})

// 2. MOUNTING THE ROUTES
app.use(`${baseUrl}/tours`, tourRouter)
app.use(`${baseUrl}/users`, userRouter)
app.use(`${baseUrl}/reviews`, reviewRouter)


app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404)
})

app.use(globalErrorHandler)

module.exports = app
