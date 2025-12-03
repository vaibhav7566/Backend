const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.Token;

    if (!token) {
      return res.status(401).json({
        message: "Token not found!",
      });
    }

    let decoded = jwt.verify(token, process.env.jwt_secret_key);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid Token!",
      });
    }

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid! or Token not found!",
    });
  }
};

module.exports = authMiddleware;
