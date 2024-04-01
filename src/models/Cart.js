const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cart = sequelize.define("Cart", {
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	bookId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1,
	},
});

module.exports = Cart;
