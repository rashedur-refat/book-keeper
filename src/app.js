const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const { authenticateToken } = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/books", authenticateToken, bookRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
