const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const { authenticateToken } = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/books", authenticateToken, bookRoutes);
app.use("/carts", authenticateToken, cartRoutes);
app.use("/orders", authenticateToken, orderRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
