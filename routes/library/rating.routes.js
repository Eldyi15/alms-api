const express = require("express");
const app = express();
const router = require("express").Router();
const ratingController = require('./../../controllers/library/ratingsController');
const { authenticate } = require("../../controllers/authenticate");
router.use(authenticate)


router.post('/',ratingController.upsertRatings)

module.exports = router;