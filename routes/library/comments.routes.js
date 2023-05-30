const express = require("express");
const app = express();
const router = require("express").Router();
const commentController = require('./../../controllers/library/commentsController')
const { authenticate } = require("../../controllers/authenticate");
router.use(authenticate)

router.get('/:bookId',commentController.getComments)
router.post('/',commentController.createComments)

module.exports = router;