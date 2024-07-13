const User = require("../models/userModel")
const catchAsync = require("../utils/catchAsync")
const AppError = require('../utils/appError')

const filterObj = (obj, ...allowedFields) => {
  const newObject = {}
  // this creates an array of all the obj we pass in and loops thorugh them
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObject[el] = obj[el]
    }
  })
  return newObject
}

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  })
})

exports.updateMe = async (req, res, next) => {
  // Create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword.',
      400
    ))
  }
  // filter out unwanted names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email')

  // update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })


  // update the user document
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
}

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    method: 'This route is not yet defined'
  })
}

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    method: 'This route is not yet defined'
  })
}

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    method: 'This route is not yet defined'
  })
}

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    method: 'This route is not yet defined'
  })
}
