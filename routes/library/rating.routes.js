const express = require("express");
const app = express();
const router = require("express").Router();
const ratingController = require('./../../controllers/library/ratingsController')


router.post('/',ratingController.upsertRatings)

module.exports = router;