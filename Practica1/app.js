const express = require("express");
const morgan = require("morgan");
const productRouter= require("./routes/productRoutes.js");
const userRouter= require("./routes/userRoutes.js");
const authRouter = require("./routes/authRoutes");
const shoppingCartRouter= require("./routes/shoppingCartRoutes");
const MyError = require("./utils/MyError");
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
app.use("/api/v1/users",userRouter); 
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/cart/", shoppingCartRouter);
app.all("*", (req, res, next) => {
    next(new MyError("route not found", 404));
});//por si no encuentra la ruta mandada ya que no existe

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        const statusCode=err.statusCode||500;
        const status = err.status||"error";
        res.status(statusCode).json({
            status: err.status,
            message: err.message,
            stack:err.stack,
        });
    } 
    else {
        if(err.isOperational){
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        else{
            res.status(500).json({
                status: "error",
                message: "severe error",
            });
        }
    }
  });
module.exports = app;

