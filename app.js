const express = require("express");
const bodyParser = require("body-parser");
require("./config/mongoose");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const path = require("path");
const productMongoDB = require("./app/product_mongoDB/routes");
const productMongoose = require("./app/product_mongoose/routes");
const productMySQL = require("./app/product_mysql/routes");
const productSequelize = require("./app/product_sequelize/routes");
const port = 3003;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/mongo/v1", productMongoDB);
app.use("/api/mongo/v2", productMongoose);
app.use("/api/mysql/v1", productMySQL);
app.use("/api/mysql/v2", productSequelize);
app.use((req, res) => {
	res.status(404);
	res.send({
		status: "failed",
		message: `Resource ${req.originalUrl} not found!`,
	});
});
app.listen(port, () => console.log("Listening at http://localhost:3003"));
