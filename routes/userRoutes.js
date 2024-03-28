const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')


const { getAllUsers, getUser, createUser, updateUser, deleteUser } = userController

// ROUTES
const router = express.Router()

router.post('/signup', authController.signup)

router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router