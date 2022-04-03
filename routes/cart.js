const express = require("express");
const { CartController } = require("../controllers");
const router = express.Router();

router.get("/products", CartController.getProducts);
router.post("/products", CartController.addProducts);
router.post("/purchase", CartController.generateOrder);
router.delete("/products/:productId", CartController.deleteProduct);

module.exports = router;
