const express = require("express");

const middlewares = require("../middlewares");
const { UsersController } = require("../controllers");
const router = express.Router();

router.post(
	"/register",
	middlewares.multer.upload("image"),
	UsersController.register
);
router.post("/login", UsersController.login);

module.exports = router;
