const express = require("express");
const app = express();
const router = require("express").Router();
const bookmarkController = require('../../controllers/library/bookmarkController');
const { authenticate } = require("../../controllers/authenticate");
router.use(authenticate)

router.post('/',bookmarkController.upsertBookmark)
router.post('/get',bookmarkController.getBookmarks)

module.exports = router;
