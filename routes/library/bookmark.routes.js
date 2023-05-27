const express = require("express");
const app = express();
const router = require("express").Router();
const bookmarkController = require('../../controllers/library/bookmarkController')

router.post('/',bookmarkController.upsertBookmark)

module.exports = router;
