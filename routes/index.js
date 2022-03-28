const express = require("express");

const products = require("./products");
const cart = require("./cart");
const users = require("./users");
const router = express.Router();

router.use("/products", products);
router.use("/cart", cart);
router.use("/users", users);

router.use("*", (req, res) => {
	res.status(404).json({
		status: "error",
		message: `ruta ${req.baseUrl} no encontrada`
	});
});

module.exports = router;
