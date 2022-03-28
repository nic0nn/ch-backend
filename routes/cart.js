const express = require("express");
const { CartController } = require("../controllers");
const router = express.Router();

router.get("/:id/productos", CartController.getProducts);
router.post("/", CartController.createCart);
router.post("/:id/productos", CartController.addProducts);
router.delete("/:id", CartController.deleteCart);
router.delete("/:id/:productId", CartController.deleteProduct);

module.exports = router;
