const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/place", orderController.placeOrder);
router.put("/update-status/:id", orderController.updateOrderStatus);

module.exports = router;
