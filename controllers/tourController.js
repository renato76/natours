const Tour = require("../models/tourModel")

// ROUTE HANDLERS

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = 'ratingsAverage,price'
  req.query.fields = 'name, price,ratingsAverage,difficulty'
  next()
}

class APIFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    const queryObj = { ...this.queryString }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObj[el])

    // 1b Advanced filtering
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))

    return this
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }
    return this
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ')
      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select('-__v')
    }
    return this
  }

  paginate() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 100
    const skip = (page - 1) * limit
    // 1-10 page 1, 11-20 page 2
    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}

exports.getAllTours = async (req, res) => {

  try {

    // Build a query
    // 1a) filtering
    // const queryObj = { ...req.query }
    // const excludedFields = ['page', 'sort', 'limit', 'fields']
    // excludedFields.forEach(el => delete queryObj[el])

    // // 1b Advanced filtering
    // let queryStr = JSON.stringify(queryObj)
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)


    // let query = Tour.find(JSON.parse(queryStr))

    // 2) Sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ')
    //   query = query.sort(sortBy)
    // } else {
    //   query = query.sort('-createdAt')
    // }

    // 3) Field limiting 
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ')
    //   query = query.select(fields)
    // } else {
    //   query = query.select('-__v')
    // }

    // 4) Pagination
    // const page = req.query.page * 1 || 1
    // const limit = req.query.limit * 1 || 100
    // const skip = (page - 1) * limit
    // // 1-10 page 1, 11-20 page 2
    // query = query.skip(skip).limit(limit)

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments()
    //   if (skip > numTours) throw new Error('This page does not exist')
    // }

    // Execute query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const tours = await features.query


    // Send response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    // or you could do Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.createTour = async (req, res) => {
  try {
    // 1 way of doing it
    // const newTour = new Tour({
    //   newTour.save()
    // })

    // Alternative way
    const newTour = await Tour.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}
