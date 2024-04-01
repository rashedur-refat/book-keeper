const Book = require("../models/Book");
const Cart = require("../models/Cart");

async function createBook(req, res) {
	try {
		const book = await Book.create(req.body);
		res.status(201).json(book);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

async function getAllBooks(req, res) {
	try {
		const books = await Book.findAll();
		res.status(200).json(books);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

async function getBookById(req, res) {
	try {
		const book = await Book.findByPk(req.params.id);
		console.log(book);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		res.status(200).json(book);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

async function updateBook(req, res) {
	try {
		const book = await Book.findByPk(req.params.id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		await book.update(req.body);
		res.status(200).json(book);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

async function deleteBook(req, res) {
	try {
		const book = await Book.findByPk(req.params.id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		const cartsWithBook = await Cart.findAll({
			where: { book_id: book.id },
		});
		if (cartsWithBook.length > 0) {
			return res.status(409).json({
				message: "Cannot delete book. It is referenced in active carts.",
			});
		}
		await book.destroy();
		res.status(204).end();
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Internal server error" });
	}
}

module.exports = {
	createBook,
	getAllBooks,
	getBookById,
	updateBook,
	deleteBook,
};
