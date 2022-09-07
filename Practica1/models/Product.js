const mongoose = require("mongoose");
const productSchema= new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:String,
        required:[true, "price is required"],
    },
    description:{
        type:String,
        required:false,
    },
});

const Product=mongoose.model("Product", productSchema);

module.exports=Product;