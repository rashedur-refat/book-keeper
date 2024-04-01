const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
	"Order",
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		totalPrice: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: "Pending",
		},
	},
	{
		tableName: "orders",
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

module.exports = Order;
