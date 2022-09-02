const express = require("express");
const morgan = require("morgan");
const productRouter= require("./routes/productRoutes.js");
const app= express();

//Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use((req,res,next)=> {
    req.requestTime = new Date().toString();
    next(); 
});


//Rutas
app.use("/api/v1/products",productRouter); 
module.exports = app;

