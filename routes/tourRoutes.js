const express = require('express')
const tourController = require('../controllers/tourController')
const authController = require("../controllers/authController")
const reviewRouter = require("./reviewRoutes")

const { getAllTours, getTour, createTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan, getToursWithin, getDistances } = tourController

const router = express.Router()

router.use('/:tourId/reviews', reviewRouter)

router.route('/top-5-cheap').get(aliasTopTours, getAllTours)

router.route('/tour-stats').get(getTourStats)

router.route('/monthly-plan/:year').get(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide', 'guide'),
  getMonthlyPlan
)

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin)

// here are a couple of ways we could specify this
// /tours-distance?distance=233&center=-40,45&unit=mi
// /tours-distance/233/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(getDistances)

router
  .route('/')
  .get(getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    createTour
  )

router
  .route('/:id')
  .get(getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour)

module.exports = router