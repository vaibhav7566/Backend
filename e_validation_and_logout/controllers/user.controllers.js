const { default: mongoose } = require("mongoose");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashPass,
    });

    if (!newUser) {
      return res.status(404).json({
        message: "Unauthorized User",
      });
    }

    const token = jwt.sign({ id: newUser._id }, process.env.jwt_secret_key, {
      expiresIn: "1h",
    });

    res.cookie("Token", token);

    return res.status(201).json({
      message: "User Created Successfully!",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required!",
      });
    }

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized User!",
      });
    }

    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) {
      return res.status(404).json({
        message: "User not found or Incorrect Email or password!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.jwt_secret_key, {
      expiresIn: "1h",
    });

    res.cookie("Token", token);

    return res.status(200).json({
      message: "User Logged In Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const userLogoutController = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(404).json({
        message: "ID not found!",
      });
    }

    const user = await userModel.findById(user_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    res.clearCookie("Token");

    return res.status(200).json({
      message: "User logged out successfully!",
    });
  } catch (error) {
    console.log("error yaha hai :", error)
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  userRegisterController,
  userLoginController,
  userLogoutController,
};
