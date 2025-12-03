const express = require("express");
const {
  userLoginController,
  userRegisterController,
  userLogoutController,
} = require("../controllers/user.controllers");

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", userLoginController);

router.post("/logout", userLogoutController);

module.exports = router;
