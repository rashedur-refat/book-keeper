const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function register(req, res) {
	try {
		console.log(req.body);
		const existingUser = await User.findOne({
			where: { email: req.body.email },
		});
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		await User.create({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		res.status(200).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(400).json({ message: "Error registering user" });
	}
}

async function login(req, res) {
	try {
		const user = await User.findOne({ where: { email: req.body.email } });
		if (!user) {
			return res.status(401).json({ message: "Invalid email or password" });
		}
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "5h",
		});
		res.status(200).json({ token });
	} catch (error) {
		res.status(400).json({ message: "Error logging in" });
	}
}

function logout(req, res) {
	res.status(200).json({ message: "User logged out successfully" });
}

module.exports = {
	register,
	login,
	logout,
};
