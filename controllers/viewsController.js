const Tour = require('../models/tourModel')
const catchAsync = require('../utils/catchAsync')


exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. get tour data
  const tours = await Tour.find()

  // 2. build template

  // 3. render template with the data

  res.status(200).render('overview', {
    title: 'All tours',
    tours
  })
})

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour'
  })
}