const path = require("path");
const fs = require("fs");
const conn = require("../../config/mysql");

const _response = (res, image) => {
	return (err, result) => {
		if (err) {
			res.send({
				status: "failed",
				response: err,
			});
		} else if (result.length < 1) {
			res.send({
				status: "failed",
				response: "ID not found",
			});

		} else if (result.affectedRows === 1) {
			res.send({
				status: "Deleted",
				response: result,
			});
		} else {
			res.send({
				status: "success",
				response: result,
			});
		}
	};
};

const indexProduct = (req, res) => {
	let { _key } = req.query;
	if (_key !== undefined) {
		conn.query(
			{
				sql: "SELECT * FROM products WHERE name LIKE ?",
				values: [`%${_key}%`],
			},
			_response(res)
		);
	} else {
		conn.query(
			{
				sql: "SELECT * FROM products",
			},
			_response(res)
		);
	}
};

const showProduct = (req, res) => {
	conn.query(
		{
			sql: "SELECT * FROM products WHERE id = ?",
			values: [req.params.id],
		},
		_response(res)
	);
};

const saveProduct = (req, res, next) => {
	const { name, price, stock, status } = req.body;
	const image = req.file;
	if (image) {
		const target = path.join(__dirname, "../../uploads", image.originalname);
		fs.renameSync(image.path, target);
	}
	conn.query(
		{
			sql: "INSERT INTO products(name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?)",
			values: [
				name,
				price,
				stock,
				status,
				`http://localhost:3000/public/${image}`,
			],
		},
		_response(res)
	);
};

const updateProduct = (req, res) => {
	const { user_id, name, price, stock, status } = req.body;
	let image = req.file;
	let sql = "";
	let values = [];

	if (image) {
		const target = path.join(__dirname, "../../uploads", image.originalname);
		fs.renameSync(image.path, target);

		sql = `UPDATE products SET user_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?`;
		values = [
			user_id,
			name,
			price,
			stock,
			status,
			`http://localhost:3000/public/${image}`,
			req.params.id,
		];
	} else {
		sql = `UPDATE products SET id = ?, user_id = ?, name = ?, price = ?, stock = ?, status = ?`;
		values = [user_id, name, price, stock, status, req.params.id];
	}
	conn.query(
		{
			sql,
			values,
		},
		_response(res)
	);
};

const deleteProduct = (req, res) => {
	conn.query(
		{
			sql: `DELETE FROM products WHERE id = ?`,
			values: [req.params.id],
		},
		_response(res)
	);
};

module.exports = {
	indexProduct,
	showProduct,
	saveProduct,
	updateProduct,
	deleteProduct,
};
