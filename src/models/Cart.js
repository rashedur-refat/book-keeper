const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cart = sequelize.define(
	"Cart",
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: "user_id",
		},
		bookId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: "book_id",
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
	},
	{
		tableName: "carts",
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

module.exports = Cart;
