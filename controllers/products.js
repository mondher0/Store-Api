const BadRequest = require("../errors/bad-request");
const NotFound = require("../errors/not-found");
const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

// create product
const createProduct = async (req, res) => {
  const { name, price, company } = req.body;
  if (!name || !price) {
    throw new BadRequest("Please provid the required fields");
  }
  const product = await Product.create({
    price,
    name,
    company,
  });
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Product was created successfully",
    product,
  });
};

// get all products
const getAllProducts = async (req, res) => {
  // pagination
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  // if (!page || !limit) {
  //   throw new BadRequest("Please provide the page and limit query parameters");
  // }
  const skipIndex = (page - 1) * limit;
  const total = await Product.countDocuments();
  const totalPage = Math.ceil(total / limit);

  // filtering
  const { featured, company, name, price } = req.query;
  let queryObject = {};
  if (featured) {
    queryObject.featured = featured;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (price) {
    queryObject.price = { $gte: price };
  }

  // sorting
  const products = await Product.find(queryObject).limit(limit).skip(skipIndex);

  // response
  res
    .status(StatusCodes.OK)
    .json({ success: true, products, nbHits: products.length, totalPage });
};

// update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequest("Please provide the id of the product to update");
  }
  const { name, price, company, featured } = req.body;
  if (!name || !price) {
    throw new BadRequest("Please provid the required fields");
  }
  const product = await Product.findByIdAndUpdate(
    id,
    {
      name,
      price,
      company,
      featured,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!product) {
    throw new NotFound(`No product found with id: ${id}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product was updated successfully",
    product,
  });
};

module.exports = { createProduct, getAllProducts, updateProduct };
