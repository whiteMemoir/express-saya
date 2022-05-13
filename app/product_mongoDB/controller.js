const { ObjectId } = require("mongodb")
const db = require("../../config/mongodb")
const collection = db.collection('products')
const path = require("path");
const fs = require('fs')


const indexProduct = (req, res) => {
    collection.find().toArray().then( result => res.send(result)).catch( err => res.send(err))
}

const showProduct = (req, res) => {
    collection.findOne({ _id : ObjectId(req.params.id)}).then( result => res.send(result)).catch( err => res.send(err)) 
}

const saveProduct = (req, res) => {
    const { name, price, stock, status } = req.body
    const image = req.file
    if (image) {
        const target = path.join(__dirname, "../../uploads", image.originalname)
        fs.renameSync(image.path, target)
    }
    collection.insertOne({
        name, price, stock, status, image: `http://localhost:3000/public/${image.originalname}`
    }).then( result => res.send(result)).catch(err => res.send(err))
}

const updateProduct = (req, res) => {
    const { name, price, stock, status } = req.body
    const image = req.file
    if (image) {
        const target = path.join(__dirname, "../../uploads", image.originalname)
        fs.renameSync(image.path, target)
    }
    collection.updateOne({ _id: ObjectId(req.params.id) },{ $set:
        {name, price, stock, status, image: `http://localhost:3000/public/${image.originalname}`}
    }).then( result => res.send(result)).catch(err => res.send(err))
}
const deleteProduct = (req, res) => {
    collection.deleteOne({ _id : ObjectId(req.params.id)}).then( result => res.send(result)).catch(err => res.send(err))
}

module.exports = { indexProduct, showProduct, saveProduct, updateProduct, deleteProduct }