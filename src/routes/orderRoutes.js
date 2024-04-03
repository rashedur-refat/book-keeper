const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders in the bookstore
 */

/**
 * @swagger
 * /order/place:
 *   post:
 *     summary: Place an order
 *     description: Place an order in the bookstore.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request (e.g., invalid order data)
 */
router.post("/place", orderController.placeOrder);

/**
 * @swagger
 * /order/update-status/{id}:
 *   put:
 *     summary: Update order status
 *     description: Update the status of an order in the bookstore.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the order to update
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Bad request (e.g., invalid order data)
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 * */
router.put("/update-status/:id", orderController.updateOrderStatus);

/**
 * @swagger
 * /order/history/{userId}:
 *   get:
 *     summary: Get order history
 *     description: Retrieve the order history for a specific user.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: The ID of the user
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Order history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 * */
router.get("/history/:userId", orderController.getOrderHistory);

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *         totalPrice:
 *           type: number
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               status:
 *                 type: string
 *       example:
 *         userId: 1
 *         totalPrice: 10
 *         items: [
 *           {
 *             productId: 1,
 *             quantity: 2,
 *             status: "Pending"
 *           }
 *         ]
 *         status: Pending
 */

module.exports = router;
