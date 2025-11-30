const express = require("express");
const connectDB = require("./config/db");
const userRoute = require("./routes/user.route");
require("dotenv").config();

const server = express();

connectDB();
server.use(express.json());

server.use("/user",userRoute);

server.listen(3000, () => {
  console.log("Server is running at port 3000");
});
