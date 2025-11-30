const { default: mongoose } = require("mongoose");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegisterController = async (req, res) => {
  try {
    // 1. Receive registration data
    let { name, email, password, contact } = req.body;

    if (!name || !email || !password || !contact) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be at least 5 characters long" });
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create User in database
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      contact,
    });

    // 4.Generate JWT tocken

    const token = jwt.sign({ id: newUser._id }, process.env.jwt_secret_key, {
      expiresIn: "1h",
    });

    console.log(token);

    // 5. Save tocken in cookie
    res.cookie("Token", token);

    return res.status(201).json({
      message: "User successfully registered",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const userLoginController = async (req, res) => {
  try {
    //1.Receive email and password
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required!",
      });
    }
    //2. Finding user in DB or Check user exist or not
    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    //3.Verify Password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.jwt_secret_key, {
      expiresIn: "1h",
    });

    res.cookie("Token", token);

    return res.status(201).json({
      message: "User logged in Successfully",
      user,
    });
  } catch (error) {
    console.log("Error in login: ", error);
    return res.status(500).json({
      message: "Internal Server Error!",
      error: error,
    });
  }
};

module.exports = { userRegisterController, userLoginController };
