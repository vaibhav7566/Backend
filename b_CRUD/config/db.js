const mongoose = require('mongoose');

const connectdb = async () => {
    try {
    let response = await mongoose.connect("mongodb://localhost:27017/Users");
        
    if(response){
        console.log("Database connected successfully");
    }
    } catch (error) {
        console.log("Erron in DB connection", error);
    }
}

module.exports = connectdb;