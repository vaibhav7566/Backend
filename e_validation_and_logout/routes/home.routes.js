const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.get("/", authMiddleware ,(req,res)=> {
res.send("Yaha user ki bank se related imp details hai ");
})

module.exports = router;