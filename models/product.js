const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
