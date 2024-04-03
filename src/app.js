const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const { authenticateToken } = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Book Keeper API",
			version: "1.0.0",
			description: "API documentation for book keeper",
		},
		basePath: "http://localhost:4000/",
		servers: [
			{
				url: "http://localhost:4000/",
			},
		],
	},
	apis: [`${__dirname}/routes/*.js`],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Creates a new book in the bookstore.
 *
 *     responses:
 *       400:
 *         description: Bad request (e.g., invalid book data)
 */

app.use("/auth", authRoutes);
app.use("/books", authenticateToken, bookRoutes);
app.use("/carts", authenticateToken, cartRoutes);
app.use("/orders", authenticateToken, orderRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
