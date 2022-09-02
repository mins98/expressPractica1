const express = require("express");
const productContoller= require("./../controllers/productController.js");
const productRouter = express.Router(); 

//Rutas
productRouter.route("/").get(productContoller.getAllProducts).post(productContoller.addProduct);
productRouter.route("/:id").get(productContoller.getProductById);
productRouter.route("/:id").delete(productContoller.deleteProductById);
productRouter.route("/:id").put(productContoller.updateProductById);
module.exports = productRouter;