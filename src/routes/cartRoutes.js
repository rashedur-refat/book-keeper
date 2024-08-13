const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: API endpoints for managing carts in the bookstore
 */

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add a book to the cart
 *     description: Add a book to the cart in the bookstore.
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Added Cart Data
 *       400:
 *         description: Invalid Input Data/Error adding book to cart
 *       404:
 *         description: User/Book not found
 */
router.post("/add", cartController.addToCart);

/**
 * @swagger
 * /cart/update/{id}:
 *   put:
 *     summary: Update a cart item
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the cart item to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Updated Cart Data
 *       400:
 *         description: Invalid Quantity/Error updating cart
 *       404:
 *         description: Cart item not found/Associated book not found
 */
router.put("/update/:id", cartController.updateCartItem);

/**
 * @swagger
 * /cart/remove/{id}:
 *   delete:
 *     summary: Remove a cart item
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the cart item to remove
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart item removed successfully
 *       404:
 *         description: Cart item not found
 *       400:
 *         description: Cart item ID is required/Error removing cart item
 */
router.delete("/remove/:id", cartController.removeCartItem);

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *         bookId:
 *           type: integer
 *         quantity:
 *           type: integer
 *       example:
 *         userId: 1
 *         bookId: 1
 *         quantity: 2
 */

module.exports = router;
