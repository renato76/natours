const express = require('express')
const tourController = require('../controllers/tourController')
const authController = require("../controllers/authController")
const reviewRouter = require("./reviewRoutes")

const { getAllTours, getTour, createTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan } = tourController

const router = express.Router()

router.use('/:tourId/reviews', reviewRouter)

router.route('/top-5-cheap').get(aliasTopTours, getAllTours)

router.route('/tour-stats').get(getTourStats)

router.route('/monthly-plan/:year').get(getMonthlyPlan)


router
  .route('/')
  .get(authController.protect, getAllTours)
  .post(createTour)

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour)

module.exports = router