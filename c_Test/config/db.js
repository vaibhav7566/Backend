const mongoose = require("mongoose");

const connectdb = () => {
  try {
    const db = mongoose.connect("mongodb://localhost:27017/ProductInfo");

    if (db) {
      console.log("Database connected succesfuly");
    }
  } catch (error) {
    console.log("Error in db connection!");
  }
};

module.exports = connectdb;
