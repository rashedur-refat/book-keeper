const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.post("/", bookController.createBook);
router.get("/search", bookController.searchBooks);
router.get("/:id", bookController.getBookById);
router.get("/", bookController.getAllBooks);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
