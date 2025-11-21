const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
 name: String,
 age: Number,
 gender: String,
 contact : Number,
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;