const express = require("express");
const { createProduct, getAllProducts, updateProduct } = require("../controllers/Products");
const router = express.Router();

router.route("/create").post(createProduct);
router.route("/").get(getAllProducts);
router.route("/:id").patch(updateProduct);

module.exports = router;
