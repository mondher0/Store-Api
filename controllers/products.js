const BadRequest = require("../errors/bad-request");
const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

// create product
const createProduct = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new BadRequest("Please provide a name value");
  }
  const product = await Product.create({
    success: true,
    message: "Product created successfully",
    name,
  });
  res.status(StatusCodes.CREATED).json(product);
};

// get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res
    .status(StatusCodes.OK)
    .json({ success: true, products, nbHits: products.length });
};

module.exports = { createProduct, getAllProducts };
