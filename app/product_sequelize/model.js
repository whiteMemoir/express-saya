const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Product = sequelize.define(
	"Product",
	{
		// Model attributes are defined here
		user_id: {
			type: DataTypes.INTEGER(1),
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		stock: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		image_url: {
			type: DataTypes.TEXT,
		},
	},
	{
		// Other model options go here
	}
);

module.exports = Product;
