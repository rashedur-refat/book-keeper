const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define("Book", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	author: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	genre: {
		type: DataTypes.STRING,
	},
	publicationDate: {
		type: DataTypes.DATE,
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
});

module.exports = Book;
