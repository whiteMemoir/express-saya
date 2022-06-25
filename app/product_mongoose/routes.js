const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
	dest: "uploads",
});
const {
	indexProduct,
	showProduct,
	saveProduct,
	updateProduct,
	deleteProduct,
} = require("./controller");

router.get("/", indexProduct);
router.get("/:id", showProduct);
router.post("/", upload.single("image"), saveProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
