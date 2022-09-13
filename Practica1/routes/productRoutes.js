const express = require("express");
const productContoller= require("./../controllers/productController.js");
const authController = require("./../controllers/authController");
const productRouter = express.Router(); 

//Rutas
productRouter.route("/").all(authController.protect).get(productContoller.getAllProducts).post(productContoller.addProduct);
productRouter.route("/:id").all(authController.protect).get(productContoller.getProductById);
productRouter.route("/:id").all(authController.protect).delete(productContoller.deleteProductById);
productRouter.route("/:id").all(authController.protect).put(productContoller.updateProductById);
module.exports = productRouter;