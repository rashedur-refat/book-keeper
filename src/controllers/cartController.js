const Cart = require("../models/Cart");
const Book = require("../models/Book");
const User = require("../models/User");

async function addToCart(req, res) {
	try {
		const { userId, bookId, quantity } = req.body;
		if (!userId || !bookId || !quantity || quantity <= 0) {
			return res.status(400).json({ message: "Invalid input data" });
		}
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const book = await Book.findByPk(bookId);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		let cartItem = await Cart.findOne({
			where: { bookId: book.id, userId: user.id },
		});
		if (cartItem) {
			cartItem.quantity += quantity;
		} else {
			cartItem = await Cart.create({
				userId: user.id,
				bookId: book.id,
				quantity,
			});
		}
		await cartItem.update({ quantity: cartItem.quantity });
		res.status(200).json(cartItem);
	} catch (error) {
		console.error("Error adding book to cart:", error);
		res.status(400).json({ message: "Error adding book to cart" });
	}
}

async function updateCartItem(req, res) {
	try {
		const { id } = req.params;
		const { quantity } = req.body;
		if (!quantity || quantity <= 0) {
			return res.status(400).json({ message: "Invalid quantity" });
		}
		const cartItem = await Cart.findByPk(id);
		if (!cartItem) {
			return res.status(404).json({ message: "Cart item not found" });
		}
		const book = await Book.findByPk(cartItem.bookId);
		if (!book) {
			return res.status(404).json({ message: "Associated book not found" });
		}
		cartItem.quantity = quantity;
		await cartItem.update({ quantity });
		res.status(200).json(cartItem);
	} catch (error) {
		console.error("Error updating cart item:", error);
		res.status(400).json({ message: "Error updating cart" });
	}
}
async function removeCartItem(req, res) {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "Cart item ID is required" });
		}
		const cartItem = await Cart.findByPk(id);
		if (!cartItem) {
			return res.status(404).json({ message: "Cart item not found" });
		}
		await cartItem.destroy();
		res.status(200).json({ message: "Cart item removed successfully" });
	} catch (error) {
		console.error("Error removing cart item:", error);
		res.status(400).json({ message: "Error removing cart item" });
	}
}

module.exports = {
	addToCart,
	updateCartItem,
	removeCartItem,
};
