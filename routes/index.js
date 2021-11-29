const express = require("express");

const products = require("./products");
const cart = require("./cart");

const router = express.Router();

router.use("/productos", products);
router.use("/carrito", cart);

router.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `ruta ${req.baseUrl} no encontrada`
  });
});

module.exports = router;
