const express = require("express");

const passport = require("../libs/passport");

const products = require("./products");
const users = require("./users");
const cart = require("./cart");
const orders = require("./orders");

const router = express.Router();

router.use("/products", products);
router.use("/users", users);
router.use("/cart", passport.authenticate("jwt", { session: false }), cart);
router.use("/orders", passport.authenticate("jwt", { session: false }), orders);

router.use("*", (req, res) => {
	res.status(404).json({
		status: "error",
		message: `ruta ${req.baseUrl} no encontrada`
	});
});

module.exports = router;
