const ShoppingCart = require("../models/ShoppingCart");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.addProductToShop = catchAsync( async(req,res)=> { 
    const user=req.user.userName;
    const shoppingCart= await ShoppingCart.find({status: 'PENDING'},{user:user})

    if(shoppingCart.length==1){
        const shopId=shoppingCart[0]._id;
        let shoppingCartUp=await ShoppingCart.findById(shopId);
        const foundProduct= await Product.findById(req.body.product_id);

        if(foundProduct){
            const newShop={"product_Id":req.body.product_id,"price":foundProduct.price,"quantity":req.body.quantity}
            shoppingCartUp.products.push(newShop);
            
            const updatedCart= await ShoppingCart.findByIdAndUpdate(shopId,shoppingCartUp,{
                new: true
            });
            res.status(200).json({
                status:"success",
                timeOfRequest: req.requestTime,
                data:{
                    updatedCart
                }
            });
        }
        else{
            res.status(404).json({
                status:"product not found",
            });
        }
    }
    else if(shoppingCart.length==0){
        let newShop = req.body;
        const cant=newShop.quantity
        const product_id=newShop.product_id
        delete newShop.quantity;
        delete newShop.product_id;
        
        const foundProduct= await Product.findById(product_id);
        if(foundProduct){
            newShop.status="PENDING";
            newShop.user=user;
            newShop.products=[];
            newShop.products.push({"product_Id":product_id,"price":foundProduct.price,"quantity":cant});
            console.log(newShop); 

            const newShoppingCart = await ShoppingCart.create(newShop);
            res.status(200).json({
                status:"success",
                data:{
                    ShoppingCart:newShoppingCart
                }
            });
        }
        else{
            res.status(404).json({
                status:"product not found",
            });
        }

        
    }
    else{
        res.status(500).json({
            status:"There is more than one active shopping cart",
        });
    }
    
});

exports.deleteProductToShopById= catchAsync( async(req,res)=> {
    const user=req.user.userName;
    const shoppingCart= await ShoppingCart.findOne({status: 'PENDING'},{user:user})
    if(shoppingCart){
        let shoppingCartUp=await ShoppingCart.findById(shoppingCart._id);
        let products=shoppingCartUp.products;

        const deletedProduct=products.find(p=> p.product_Id==req.params.id);
        
        if(deletedProduct){
            const index=products.findIndex(p => p.product_Id==req.params.id);
            console.log(index);
            products.splice(index,1); 
            shoppingCartUp.products=products;
            const updatedCart= await ShoppingCart.findByIdAndUpdate(shoppingCartUp._id,shoppingCartUp,{
                new: true
            });

            res.status(200).json({
                status:"success",
                data:{
                    ShoppingCart: updatedCart
                }
            });
        }
        else{
            res.status(404).json({
                status:"not found",
            });
        }
    }
    else{
        res.status(404).json({
            status:"you do not have any cart with items",
        });
    }
   
});


exports.payShop=catchAsync( async(req,res)=> {
    const user=req.user.userName;
    const shoppingCart= await ShoppingCart.find({status: 'PENDING'},{user:user})
    if(shoppingCart.length==1){
        const shopId=shoppingCart[0]._id;
        let shoppingCartUp=await ShoppingCart.findById(shopId);
        if(shoppingCartUp.products.length>0){

            shoppingCartUp.status='PAID';
            const updatedCart= await ShoppingCart.findByIdAndUpdate(shopId,shoppingCartUp,{
                new: true
            });

            total = shoppingCartUp.products.map((x) => x.price * x.quantity, shoppingCartUp.products);
            total=total.reduce((x,y)=>x+y,0); 
            res.status(200).json({
                status:"success",
                data:{
                    ShoppingCart: updatedCart,
                    TotalToPay:total
                }
            });
        }
        else{
            res.status(404).json({
                status:"you dont have items in your shopping cart",
            }); 
        }
    }
    else if(shoppingCart.length==0){
        res.status(404).json({
            status:"you dont have any shopping cart",
        });  
    }
    else{
        res.status(500).json({
            status:"There is more than one active shopping cart",
        });
    }
});
