const mongoose = require("mongoose");

const connectDB = async () => {
    try {
const res = await mongoose.connect('mongodb://localhost:27017/Authantication');
        if(res){
            console.log("Database connected successfully");
        }
    } catch (error) {
        console.log("Error in DB connection!");
    }
}

module.exports = connectDB;