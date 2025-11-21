// const http = require('http');

// const server = http.createServer((req,res) => {
//     res.end("I am servennkuubbbbbbbbbbbbbbbbbbbbbbbklnfer");
// })

// server.listen(2011,()=> {
//     console.log('inside');
// })

// const express = require("express");

// const server = express();

// server.get('/About', (req, res)=>{
//     res.send("Hello Server from Express");
// })
// server.listen(3030, ()=>{
//     console.log("Hellllllloooooo Challljaaa bkl");
// })

// Important
// creating a server / listening an server / making an api / conneting a node.js with mongodb using mongoose / storing data in mongodb

// const express = require('express');
// const { default: mongoose } = require('mongoose');
// const userModel = require('./Models/user.model');

// const server = express();

// const connectDB = async () => {
//     try {
//         let res = await mongoose.connect("mongodb://localhost:27017/Nobita");
//         if(res){
//             console.log("DB connected");
//         }
//     } catch (error) {
//      console.log("Error in db connection!");
//     }
// }

// connectDB();

// server.get("/user", async (req,res) => {
//   let newUser = await userModel.create({
//        name: "Vaibhav",
//        age: 22,
//        gender: "sksjjs",
//        contact: 123459,
//     })

//     console.log(newUser);
//     res.send(newUser);

// })

// server.get('/',(req,res) => {
//     res.send({
//         name:"vaibhav",
//         age:20,
//     })
//     res.send("Helllo Worldddd");
// }
// )

// server.listen(2020,()=> {
//     console.log('hjbfebnf');
// })

const express = require("express");
const { default: mongoose } = require("mongoose");
const productModel = require("./Models/product.model");

const server = express();

server.use(express.json());

const connectdb = async () => {
  try {
    let res = await mongoose.connect("mongodb://localhost:27017/Products");
    if (res) {
      console.log("Database connected");
    }
  } catch (error) {
    console.log("Error in connection of DB", error);
  }
};

connectdb();


// Staticly data transfer to DB.

server.get("/product", async (req, res) => {
  try {
    let newproduct = await productModel.create({
      productName: "Keyboard",
      productID: 97656788,
      productType: "Electronic",
      price: 2500,
    });

    if (newproduct) {
      console.log("Product data saved successfully!");
      res.send(newproduct);
    }
  } catch (error) {
    console.log("Error Occured", error);
  }
});

// Dynamicly data transfer to DB Using PostMan in place of Frontend.

server.post("/products", async (req,res) => {
 try {
   let {productName,productID,productType,price} = req.body;

  const newProduct = await productModel.create({
    productName,
    productID,
    productType,
    price,
  })

  if(newProduct){
    console.log("Added new product successfully!");
    res.send(newProduct);
  }
 } catch (error) {
  console.log("Error new products not added", error);
 }
})


server.listen(3000, console.log("Server is listened at port 3000"));
