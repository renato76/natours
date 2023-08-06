const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

// 2. ROUTE HANDLERS or CONTROLLERS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  })
}

const getTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find(el => el.id === id)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
}

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: 'success',
    tour: '<Updated tour here...>'
  })
}

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
}

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    method: 'This route is not yet defined'
  })
}

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    method: 'This route is not yet defined'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    method: 'This route is not yet defined'
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    method: 'This route is not yet defined'
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    method: 'This route is not yet defined'
  })
}

// ROUTES
app
  .route(`${baseUrl}/tours`)
  .get(getAllTours)
  .post(createTour)

app
  .route(`${baseUrl}/tours/:id`)
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

app
  .route(`${baseUrl}/users`)
  .get(getAllUsers)
  .post(createUser)

app
  .route(`${baseUrl}/users/:id`)
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

// START SERVER
const port = 3000
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
