const express = require("express");
const app = express();
const router = require("express").Router();
const userController = require("./../controllers/userController");
const { authenticate } = require("../controllers/authenticate");

// router.post('create-user')

router.post("/login-user", userController.login);

router.get("/", userController.getUsers);

router.use(authenticate);

router.post("/create-user", userController.createUser);
router.get("/user-counts", userController.getuserCounts);

router.route("/:id").patch(userController.updateUser);

module.exports = router;
