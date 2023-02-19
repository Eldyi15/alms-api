const express = require("express");
const app = express();
const router = require("express").Router();
const aggregateController = require("./../controllers/aggregateController");

router.route("/:collection").post(aggregateController.aggregate);
module.exports = router;
