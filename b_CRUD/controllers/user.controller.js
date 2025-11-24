const userModel = require("../Models/user.model");

const userRegisterController = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json({
        message: "Incompele user data!, try again",
      });
    }

    let newUser = await userModel.create({
      name,
      email,
      password,
    });

    if (newUser) {
      return res.status(201).json({
        message: "New user registered successfully",
        user: newUser,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unauthorized user!",
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    let users = await userModel.find();

    if (users) {
      return res.send(users);
    }
  } catch (error) {
    return res.send("Error in fetching data");
  }
};

const getSingleUserController = async (req, res) => {
  try {
    let user_id = req.params.id;

    if (!user_id) {
      return res.send("User_ID not found!");
    }

    let user = await userModel.findById(user_id);

    if (user) {
      return res.send(user);
    }
  } catch (error) {
    return res.send("Error in fetching user data!");
  }
};

const updateUserController = async (req, res) => {
  try {
    let user_id = req.params.id;

    if (!user_id) {
      return res.send("Invalid user id!");
    }

    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send("Incompleted user data!");
    }

    let updatedUser = await userModel.findByIdAndUpdate(
      user_id,
      {
        name,
        email,
        password,
      },
      {
        new: true,
      }
    );

    await updatedUser.save();

    if (updatedUser) {
      return res.send(updatedUser);
    }
  } catch (error) {
    return res.send("error in updating data");
  }
};

const deleteUserController = async (req, res) => {
  try {
    let user_id = req.params.id;

    if (!user_id) {
      return res.send("Invalid User!");
    }

    let user = await userModel.findByIdAndDelete(user_id);

    if (user) {
      return res.send("User deleted successfully");
    }
  } catch (error) {
    return res.send("Error in deleting data");
  }
};

module.exports = {
  userRegisterController,
  getAllUsersController,
  getSingleUserController,
  updateUserController,
  deleteUserController,
};
