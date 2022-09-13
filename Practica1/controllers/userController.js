const User = require("../models/User");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");

exports.getAllUsers = catchAsync( async(req,res)=> { 
    const users= await User.find(); 
    res.status(200).json({
        status:"success",
        timeOfRequest: req.requestTime,
        results: users.length,
        data:{
            users
        }
    });
});

exports.addUser= catchAsync( async(req,res)=> {
    req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

    let newUser = await User.create(req.body);
    newUser = newUser.toObject();
    delete newUser.password;
    res.status(200).json({
        status:"success",
        data:{
            user:newUser
        }
    });
});

exports.getUserById=catchAsync( async(req,res)=> {
    const foundUser= await User.findById(req.params.id);
    if(foundUser){
        res.status(200).json({
            status:"success",
            data:{
                user: foundUser
            }
        });
    }
    else{
        res.status(404).json({
            status:"not found",
        });
    }
});

exports.deleteUserById=catchAsync( async (req,res)=> {
    const deletedUser= await User.findByIdAndDelete(req.params.id);
    if(deletedUser){
        res.status(200).json({
            status:"success",
            data:{
                idDeleted:req.params.id,
                productDeleted:deletedUser
            }
        });
    }
    else{
        res.status(404).json({
            status:"not found",
        });
    }
});

exports.updateUserById=catchAsync( async(req,res)=> {
    
    req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
    let updatedUser= await User.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    });

    updatedUser = updatedUser.toObject();
    delete updatedUser.password;
    if(updatedUser){
        res.status(200).json({
            status:"success",
            data:{
                    idUpdated:req.params.id,
                    updatedProduct:updatedUser,
                }
        });
    }
    else{
        res.status(404).json({
            status:"not found",
        });
    }
});
