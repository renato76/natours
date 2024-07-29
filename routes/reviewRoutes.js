const express = require('express')
const reviewController = require("../controllers/reviewController")
const authController = require("../controllers/authController")

const { getAllReviews, createReview, setTourUserIds, getReview } = reviewController

const router = express.Router({ mergeParams: true })

router.use(authController.protect)

router.route('/')
  .get(getAllReviews)
  .post(
    authController.restrictTo('user'),
    setTourUserIds,
    createReview
  )

router.route('/:id')
  .get(getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  )

module.exports = router