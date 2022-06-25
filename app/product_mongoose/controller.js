const path = require("path");
const fs = require("fs");
const Product = require("./model");

const indexProduct = async (req, res) => {
	const product = await Product.find();
	res.send(product);
};
const showProduct = async (req, res) => {
	const product = await Product.findOne({ _id: req.params.id });
	res.send(product);
};
const saveProduct = async (req, res) => {
	const { name, price, stock, status } = req.body;
	const image = req.file;
	console.log(req.body);
	console.log(req.file);
	if (image) {
		const target = path.join(__dirname, "../../uploads", image.originalname);
		fs.renameSync(image.path, target);
	}
	const product = await Product.insertMany({
		name,
		price,
		stock,
		status,
		image: image ? `http://localhost:3003/public/${image.originalname}` : null,
	});
	res.send(product);
};
const updateProduct = async (req, res, next) => {
	const { name, price, stock, status } = req.body;
	const image = req.file;
	console.log(req.body);
	console.log(req.file);
	if (image) {
		const target = path.join(__dirname, "../../uploads", image.originalname);
		fs.renameSync(image.path, target);
	}
	const product = await Product.updateOne(
		{ _id: req.params.id },
		{
			$set: {
				name,
				price,
				stock,
				status,
				image: image
					? `http://localhost:3003/public/${image.originalname}`
					: null,
			},
		}
	);
	res.send(product);
};
const deleteProduct = async (req, res) => {
	const product = await Product.deleteOne({ _id: req.params.id });
	res.send(product);
};

module.exports = {
	indexProduct,
	showProduct,
	saveProduct,
	updateProduct,
	deleteProduct,
};
