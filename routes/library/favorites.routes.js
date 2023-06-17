const express = require("express");
const app = express();
const router = require("express").Router();
const favoriteController = require('./../../controllers/library/favoritesController')
const { authenticate } = require("../../controllers/authenticate");
router.use(authenticate)

router.post('/',favoriteController.getFavorites).delete(favoriteController.removeFavorites)
router.post('/add',favoriteController.addFavorites)


module.exports = router;