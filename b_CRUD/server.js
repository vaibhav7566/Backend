const express = require("express");
const connectdb = require("../b_CRUD/config/db");
const { default: mongoose } = require("mongoose");
const userModel = require("./Models/user.model");
const userRoutes = require("../b_CRUD/routes/user.routes");

const server = express();

connectdb();

server.use(express.json());


server.use("/api/user",userRoutes);




server.listen(3000, () => {
  console.log("Server is running at port 3000");
});
