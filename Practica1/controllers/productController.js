const fs = require("fs");
const Product = require("../models/Product");
const mongoose = require("mongoose");

exports.getAllProducts = async(req,res)=> { //ahora tienen que ser asyncronas

    const products= await Product.find(); //con el await por lo de asincrono
    res.status(200).json({
        status:"success",
        timeOfRequest: req.requestTime,
        results: products.length,
        data:{
            products
        }
    });
}
exports.addProduct= async(req,res)=> {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
        status:"success",
        data:{
            product:newProduct
        }
    });
}
exports.getProductById=async(req,res)=> {
    const foundProduct= await Product.findById(req.params.id);
    if(foundProduct){
        res.status(200).json({
            status:"success",
            data:{
                product: foundProduct
            }
        });
    }
    else{
        res.status(404).json({
            status:"not found",
        });
    }
}

exports.deleteProductById=async (req,res)=> {
    const deletedProduct= await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"success",
        data:{
            idDeleted:req.params.id,
            productDeleted:deletedProduct
        }
    });
}

exports.updateProductById=async(req,res)=> {
    
    const foundProduct= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    });
    res.status(200).json({
        status:"success",
        data:{
                idUpdated:req.params.id,
                updatedProduct:foundProduct,
            }
    });

}
