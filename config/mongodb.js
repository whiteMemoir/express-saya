const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://devy:devy@localhost:27017?authSource=admin";
const dbName = "edu";
const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// client.connect((err, client) => {
// 	if (err) {
// 		return console.log(err);
// 	}
// 	console.log("Koneksi berhasil");
// 	const db = client.db(dbName);
// 	const collection = db.collection("data");
// });

(async () => {
	try{
		await client.connect();
		console.log("Koneksi berhasil");
	} catch(e) {
		console.log(e);
	}

})();

const db = client.db(dbName)

module.exports = db