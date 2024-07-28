const express = require('express')
const reviewController = require("../controllers/reviewController")
const authController = require("../controllers/authController")

const { getAllReviews, createReview, setTourUserIds, getReview } = reviewController

const router = express.Router({ mergeParams: true })

router.route('/')
  .get(getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    setTourUserIds,
    createReview
  )

router.route('/:id')
  .get(getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview)

module.exports = router