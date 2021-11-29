const express = require("express");
const { cart } = require("../controllers");
const router = express.Router();

router.get("/:id/productos", cart.getProducts);
router.post("/", cart.createCart);
router.post("/:id/productos", cart.addProducts);
router.delete("/:id", cart.deleteCart);
router.delete("/:id/:productId", cart.deleteProduct);

module.exports = router;
