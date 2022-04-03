const express = require("express");
const { OrderController } = require("../controllers");
const router = express.Router();

router.get("/", OrderController.getOrders);

module.exports = router;
