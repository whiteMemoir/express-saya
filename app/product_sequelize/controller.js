const path = require("path");
const fs = require('fs')
const Product = require('./model')

const indexProduct = async(req, res) => {
    const product = await Product.findAll()
    res.send(product)
}
const showProduct = async (req, res) => {
    const product = await Product.findAll({
        where: { id: req.params.id}
    })
    if (product.length === 0) {
        res.send({
            status: 'failed',
            message: 'ID tidak ditemukan'
        })
    } else {
        res.send(product)
    }
}
const saveProduct = async (req, res) => {
    const { user_id, name, price, stock, status } = req.body;
	const image = req.file;
	console.log(JSON.stringify(image));
	console.log(image);
	if (image) {
		const target = path.join(__dirname, "../../uploads", image.originalname);
		fs.renameSync(image.path, target);
	}
	try {
		await Product.sync({
			alter: true,
		});
		const result = await Product.create({
			user_id,
			name,
			price,
			stock,
			status,
			image_url: `http://localhost:8080/public/${image.originalname}`,
		});
		res.send({
            status: 'Success',
            message: 'Data berhasil diupdate',
            data: result
        });
	} catch (e) {
		res.send(e);
	}
}
const updateProduct = async (req, res) => {
    const { user_id, name, price, stock, status } = req.body;
	const image = req.file;
	console.log(JSON.stringify(image));
	console.log(image);
	if (image) {
		const target = path.join(__dirname, "../../uploads", image.originalname);
		fs.renameSync(image.path, target);
	}
	try {
		const result = await Product.update({
			user_id,
			name,
			price,
			stock,
			status,
			image_url: `http://localhost:8080/public/${image.originalname}`,
		}, {where: { id : req.params.id}});
		res.send({
            status: 'Success',
            message: 'Data berhasil diupdate'
        });
	} catch (e) {
		res.send(e);
	}
}
const deleteProduct = async (req, res) => {
    const product = await Product.destroy({ where : { id: req.params.id}})
	res.send({
        status: 'Success',
        message: 'Data berhasil dihapus'
    });}

module.exports = {indexProduct, showProduct, saveProduct, updateProduct, deleteProduct}