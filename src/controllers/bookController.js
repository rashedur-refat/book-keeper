const { Op } = require("sequelize");
const Book = require("../models/Book");
const Cart = require("../models/Cart");

async function createBook(req, res) {
	try {
		const book = await Book.create(req.body);
		res.status(200).json(book);
	} catch (error) {
		res.status(400).json({ message: "Invalid book data" });
	}
}

async function getAllBooks(req, res) {
	try {
		const books = await Book.findAll();
		res.status(200).json(books);
	} catch (error) {
		res.status(400).json({ message: "Error fetching books!" });
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
		res.status(400).json({ message: "Error fetching book!" });
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
		res.status(400).json({ message: "Invalid book data" });
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
			return res.status(403).json({
				message: "Cannot delete book. It is referenced in active carts.",
			});
		}
		await book.destroy();
		res.status(200).json({ message: "Book deleted successfully" });
	} catch (error) {
		res.status(400).json({ message: "Error deleting book" });
	}
}

async function searchBooks(req, res) {
	try {
		const { title, author, genre } = req.query;
		console.log(title, author, genre);
		const searchCriteria = {};
		if (title) {
			searchCriteria.title = { [Op.iLike]: `%${title}%` };
		}
		if (author) {
			searchCriteria.author = { [Op.iLike]: `%${author}%` };
		}
		if (genre) {
			searchCriteria.genre = { [Op.iLike]: `%${genre}%` };
		}

		const books = await Book.findAll({ where: searchCriteria });

		res.status(200).json(books);
	} catch (error) {
		res.status(400).json({ message: "Error fetching books" });
	}
}

module.exports = {
	createBook,
	getAllBooks,
	getBookById,
	updateBook,
	deleteBook,
	searchBooks,
};
