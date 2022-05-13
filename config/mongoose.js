const mongoose = require("mongoose")

mongoose.connect("mongodb://devy:devy@localhost:27017/edu-mongoose?authSource=admin")

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => console.log('Server database terhubung'))