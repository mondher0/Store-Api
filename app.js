require("./db/connect");
require("express-async-errors");
require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const fileUpload = require("express-fileupload");
const productRoutes = require("./routes/products");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const app = express();

// middleware
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }),
);

// routes
app.use("/api/v1/products", productRoutes);

// error handler
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

start();
