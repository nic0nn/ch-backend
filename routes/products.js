const express = require("express");
const { products } = require("../controllers");
const { isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.get("/:id?", products.getProducts, products.getProductById);
router.post("/", isAdmin, products.createProduct);
router.put("/:id", isAdmin, products.updateProduct);
router.delete("/:id", isAdmin, products.deleteProduct);

module.exports = router;
