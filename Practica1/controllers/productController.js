const Product = require("../models/Product");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync( async(req,res)=> { 
    const products= await Product.find(); 
    res.status(200).json({
        status:"success",
        timeOfRequest: req.requestTime,
        results: products.length,
        data:{
            products
        }
    });
});

exports.addProduct= catchAsync( async(req,res)=> {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
        status:"success",
        data:{
            product:newProduct
        }
    });
});

exports.getProductById=catchAsync( async(req,res)=> {
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
});

exports.deleteProductById=catchAsync( async (req,res)=> {
    const deletedProduct= await Product.findByIdAndDelete(req.params.id);
    if(deletedProduct){
        res.status(200).json({
            status:"success",
            data:{
                idDeleted:req.params.id,
                productDeleted:deletedProduct
            }
        });
    }
    else{
        res.status(404).json({
            status:"not found",
        });
    }
});

exports.updateProductById=catchAsync( async(req,res)=> {
    
    const updatedProduct= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    });
    if(updatedProduct){
        res.status(200).json({
            status:"success",
            data:{
                    idUpdated:req.params.id,
                    updatedProduct:updatedProduct,
                }
        });
    }
    else{
        res.status(404).json({
            status:"not found",
        });
    }
});
