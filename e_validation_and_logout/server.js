const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const homeRoutes = require("./routes/home.routes");

const cookieParser = require("cookie-parser");
require("dotenv").config();
const server = express();

connectDB();

server.use(express.json());
server.use(cookieParser());

server.use("/api/user", userRoutes);
server.use("/api/home", homeRoutes);

server.listen(3000, () => {
  console.log("Server is running at port 3000");
});
