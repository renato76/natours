const User = require("../models/userModel")
const catchAsync = require("../utils/catchAsync")
const AppError = require('./utils/appError')

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

exports.updateMe = (req, res, next) => {
  if(req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates, please use updateMyPassword', 400))
  } 
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
