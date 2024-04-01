const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);
router.put("/update/:id", cartController.updateCartItem);
router.delete("/remove/:id", cartController.removeCartItem);

module.exports = router;
