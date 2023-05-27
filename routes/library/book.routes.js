const express = require("express");
const app = express();
const router = require("express").Router();
const bookController = require('./../../controllers/library/bookController');
const { authenticate } = require("../../controllers/authenticate");
router.use(authenticate)

router.route('/books').get(bookController.getBooks).post(bookController.createBook)
router.route('/books/:id').patch(bookController.updateBook).delete(bookController.deleteBook)

module.exports = router;