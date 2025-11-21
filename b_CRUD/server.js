const express = require("express");
const connectdb = require("../b_CRUD/config/db");
const { default: mongoose } = require("mongoose");
const userModel = require("./Models/user.model");

const server = express();

connectdb();

server.use(express.json());

server.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send("Incomplete user data!");
    }

    let newUser = await userModel.create({
      name,
      email,
      password,
    });

    if (newUser) {
      return res.send(newUser);
    }
  } catch (error) {
    return res.send("Error in registering user", error);
  }
});

server.get("/users", async (req, res) => {
  try {
    let users = await userModel.find();

    if (users) {
      return res.send(users);
    }
  } catch (error) {
    return res.send("Error in fetching data");
  }
});

server.get("/user/:id", async (req, res) => {
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
});

server.put("/update/:id", async (req, res) => {
  try {
    let user_id = req.params.id;

    if (!user_id) {
      return res.send("Invalid user id!");
    }

    let { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.send("Incompleted user data!");
    }

    let updatedUser = await userModel.findByIdAndUpdate(user_id, {
        name,
        email,
        password,
    },{
        new: true,
    });

    await updatedUser.save();

    if (updatedUser) {
      return res.send(updatedUser); 
    }
  } catch (error) {
    return res.send("error in updating data");
  }
});

server.delete("/delete/:id", async (req,res) => {
    try {
        let user_id = req.params.id;

        if(!user_id){
            return res.send("Invalid User!");
        }


        let user = await userModel.findByIdAndDelete(user_id);

        if(user){
            return res.send("User deleted successfully");
        }
    } catch (error) {
        return res.send("Error in deleting data");
    }
})
server.listen(3000, () => {
  console.log("Server is running at port 3000");
});
