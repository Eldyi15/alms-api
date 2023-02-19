const express = require("express");
const app = express();
const router = require("express").Router();
const logBookController = require("./../controllers/logbookController");

router.route("/").post(logBookController.createLogs);
router.route("/aggregate").post(logBookController.aggregateLogs);

module.exports = router;
