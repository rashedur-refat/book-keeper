const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books in the bookstore
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     description: Creates a new book in the bookstore.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request (e.g., invalid book data)
 */
router.post("/", bookController.createBook);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Search for books
 *     tags: [Books]
 *     description: Retrieves books based on specific search criteria.
 *     parameters:
 *       - in: query
 *         name: title
 *         description: Search by book title (optional)
 *         type: string
 *       - in: query
 *         name: author
 *         description: Search by book author (optional)
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request (e.g., invalid search parameters)
 */
router.get("/search", bookController.searchBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     description: Retrieves information about a specific book based on its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the book to retrieve
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.get("/:id", bookController.getBookById);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     description: Retrieves information about all books in the bookstore.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", bookController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     description: Updates information about an existing book based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the book to update
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request (e.g., invalid book data)
 *       404:
 *         description: Book not found
 */
router.put("/:id", bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     description: Deletes a book from the bookstore based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the book to delete
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Book deleted successfully (no content)
 *       409:
 *         description: Cannot delete book. It is referenced in active carts.
 */
router.delete("/:id", bookController.deleteBook);

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         genre:
 *           type: string
 *           description: The genre of the book
 *         publicationDate:
 *           type: string
 *           format: datetime
 *           description: The publication date of the book
 *         price:
 *           type: number
 *           description: The price of the book
 *       required:
 *         - title
 *         - author
 *       example:
 *         id: 1
 *         title: The Great Gatsby
 *         author: F. Scott Fitzgerald
 *         genre: Novel
 *         publicationDate: 1925-04-10
 *         price: 10.99
 */

module.exports = router;
