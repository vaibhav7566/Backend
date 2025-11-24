const express = require("express");
const userModel = require("../Models/user.model");
const { userRegisterController, getAllUsersController, getSingleUserController, updateUserController, deleteUserController } = require("../controllers/user.controller");


const router = express.Router();

router.post("/register", userRegisterController );

router.get("/users", getAllUsersController);

router.get("/user/:id", getSingleUserController);

router.put("/update/:id", updateUserController);

router.delete("/delete/:id", deleteUserController);

module.exports = router;