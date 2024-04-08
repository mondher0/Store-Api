const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/Products");
const router = express.Router();

router.route("/create").post(createProduct);
router.route("/").get(getAllProducts);

module.exports = router;
