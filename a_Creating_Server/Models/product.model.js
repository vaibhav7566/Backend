const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
productName : {
    type:String,
    required: true,
},
productID : {
    type: Number,
    required: true,
    unique: true,
},
productType : {
    type: String,
    required: true,
},
price : {
    type: Number,
    required: true,
},
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;