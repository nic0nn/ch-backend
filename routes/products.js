const express = require("express");
const { products } = require("../controllers");
const { IS_ADMIN } = require("../middlewares/auth");
const router = express.Router();

router.get("/:id?", products.getProducts, products.getProductById);
router.post("/", IS_ADMIN, products.createProduct);
router.put("/:id", IS_ADMIN, products.updateProduct);
router.delete("/:id", IS_ADMIN, products.deleteProduct);

module.exports = router;
