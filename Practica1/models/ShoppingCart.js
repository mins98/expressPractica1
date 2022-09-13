const mongoose = require("mongoose");
const userSchema= new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    products:{
        type:Array,
    },
});

const ShoppingCart=mongoose.model("ShoppingCart", userSchema);

module.exports=ShoppingCart;