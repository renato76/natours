const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const { getAllUsers, getUser, createUser, updateUser, deleteUser, getMe } = userController

// ROUTES
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

// Protect all routes after this middleware
router.use(authController.protect)

router.patch('/updateMyPassword', authController.updatePassword)

router.get('/me', getMe, getUser)
router.patch('/updateMe', userController.updateMe)
router.delete('/deleteMe', userController.deleteMe)

// Restrict all routes after this midddleware to admin
router.use(authController.restrictTo('admin'))

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