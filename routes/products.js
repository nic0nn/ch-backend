const express = require("express");
const { ProductController } = require("../controllers");
const router = express.Router();
const middlewares = require("../middlewares");
const passport = require("../libs/passport");

router.get(
	"/:id?",
	ProductController.getProducts,
	ProductController.getProductById
);

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	middlewares.auth.adminOnly,
	middlewares.multer.upload("image"),
	ProductController.createProduct
);

router.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	middlewares.auth.adminOnly,
	middlewares.multer.upload("image"),
	ProductController.updateProduct
);

router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	middlewares.auth.adminOnly,
	ProductController.deleteProduct
);

module.exports = router;
