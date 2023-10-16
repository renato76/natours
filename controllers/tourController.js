// const Tour = require("../models/tourModel")

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing mame or price'
    })
  }
  next()
}

// ROUTE HANDLERS

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours
    // }
  })
}

// exports.getTour = (req, res) => {
//   const id = req.params.id * 1
//   const tour = tours.find(el => el.id === id)
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour
//     }
//   })
// }

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour
    // }
  })
}

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    tour: '<Updated tour here...>'
  })
}

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  })
}
