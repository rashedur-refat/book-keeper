const { body, validationResult } = require("express-validator");

const ValidatorMiddleware = (rules) => {
	return async (req, res, next) => {
		await Promise.all(rules.map((rule) => rule.run(req)));

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}
		console.log("errors", errors);

		const messageBag = errors.array().reduce((acc, e) => {
			acc[e.path] = e.msg;
			return acc;
		}, {});

		res.status(422).json({
			...messageBag,
			message: "Validation Error",
		});
	};
};

const UserRegisterValidator = ValidatorMiddleware([
	body("username")
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters long"),
	body("email").isEmail().withMessage("Invalid email"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
]);

const UserLoginValidator = ValidatorMiddleware([
	body("email").isEmail().withMessage("Invalid email"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
]);

module.exports = {
	UserRegisterValidator,
	UserLoginValidator,
};
