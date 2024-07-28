const express = require('express')
const reviewController = require("../controllers/reviewController")
const authController = require("../controllers/authController")

const { getAllReviews, createReview } = reviewController

const router = express.Router({ mergeParams: true })

router.route('/')
  .get(getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    createReview
  )

router.route('/:id').delete(reviewController.deleteReview)

module.exports = router