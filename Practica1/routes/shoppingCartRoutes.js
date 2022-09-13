const express = require("express");
const shoppingCartController= require("./../controllers/shoppingCartController.js");
const authController = require("./../controllers/authController");
const shoppingCartRouter = express.Router(); 

//Rutas
shoppingCartRouter.route("/product").all(authController.protect).post(shoppingCartController.addProductToShop);
shoppingCartRouter.route("/product/:id").all(authController.protect).delete(shoppingCartController.deleteProductToShopById);
shoppingCartRouter.route("/pay").all(authController.protect).post(shoppingCartController.payShop);
shoppingCartRouter.route("/").all(authController.protect).get(shoppingCartController.getShopCart);
module.exports = shoppingCartRouter;