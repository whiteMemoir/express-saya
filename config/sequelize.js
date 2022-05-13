const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("eduwork-crud-v2", "root", "", {
	host: "localhost",
	dialect: "mysql",
});

module.exports = sequelize;