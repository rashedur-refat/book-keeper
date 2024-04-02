const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
	"Order",
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: "user_id",
		},
		totalPrice: {
			type: DataTypes.FLOAT,
			allowNull: false,
			field: "total_price",
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: "Pending",
		},
		items: {
			type: DataTypes.JSONB,
			allowNull: false,
		},
	},
	{
		tableName: "orders",
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

module.exports = Order;
