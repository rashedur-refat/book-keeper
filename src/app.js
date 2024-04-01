const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/AuthRoutes");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
