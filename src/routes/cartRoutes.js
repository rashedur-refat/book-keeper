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
 *       201:
 *         description: Book added to cart
 *       400:
 *         description: Bad request (e.g., invalid cart data)
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
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       400:
 *         description: Bad request (e.g., invalid cart data)
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 * */
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
 *         type: integer
 *     responses:
 *       200:
 *         description: Cart item removed successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 * */
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
