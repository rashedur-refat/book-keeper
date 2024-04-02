const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Book = require("../models/Book");

async function placeOrder(req, res) {
	try {
		const { userId, items } = req.body;

		if (!userId || !items) {
			return res.status(400).json({ message: "Invalid input data" });
		}

		let totalPrice = 0;
		for (const item of items) {
			if (!item.bookId || !item.quantity || item.quantity <= 0) {
				return res.status(400).json({ message: "Invalid input data" });
			}
			const book = await Book.findByPk(item.bookId);
			if (!book) {
				return res.status(404).json({ message: "Book not found" });
			}
			totalPrice += book.price * item.quantity;
		}

		const order = await Order.create({
			userId,
			items,
			totalPrice,
			status: "Pending",
		});

		await Cart.destroy({ where: { userId } });

		res.status(201).json(order);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

async function updateOrderStatus(req, res) {
	try {
		const { id } = req.params;
		const { status } = req.body;

		if (!status) {
			return res.status(400).json({ message: "Status is required" });
		}
		const order = await Order.findByPk(id);
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		await order.update({ status });

		res.status(200).json({ message: "Order status updated successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

async function getOrderHistory(req, res) {
	try {
		const { userId } = req.params;

		const orderHistory = await Order.findAll({
			where: { userId },
			order: [["created_at", "DESC"]],
		});

		res.status(200).json(orderHistory);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

module.exports = {
	placeOrder,
	updateOrderStatus,
	getOrderHistory,
};
