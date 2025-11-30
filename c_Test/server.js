const express = require("express");
const connectdb = require("./config/db");
const productModel = require("./models/product.model");

const server = express();

connectdb();

server.use(express.json());

server.post("/addProduct", async (req, res) => {
  try {
    const {
      productName,
      currency,
      price,
      category,
      description,
      images,
      sizes,
      colors,
    } = req.body;

    if (
      !productName ||
      !currency ||
      !price ||
      !category ||
      !description ||
      !images ||
      !sizes ||
      !colors
    ) {
      return res.status(422).json({
        message: "Incompele data!, try again",
      });
    }
    const newproduct = await productModel.create({
      productName,
      currency,
      price,
      category,
      description,
      images,
      sizes,
      colors,
    });
    if (newproduct) {
      return res.status(201).json({
        message: "New product data registered successfully",
        product: newproduct,
      });
    }
  } 
  catch (error) {
    return res.status(404).json({
      message: "Unauthorized data!",
    });
  }
});

server.listen(2000, () => {
  console.log("Serevr is running at port 2000");
});
