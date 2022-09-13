const express = require("express");
const userContoller= require("./../controllers/userController.js");
const authController = require("./../controllers/authController");
const userRouter = express.Router(); 

//Rutas
userRouter.route("/").all(authController.protect).get(userContoller.getAllUsers).post(userContoller.addUser);
userRouter.route("/:id").all(authController.protect).get(userContoller.getUserById);
userRouter.route("/:id").all(authController.protect).delete(userContoller.deleteUserById);
userRouter.route("/:id").all(authController.protect).put(userContoller.updateUserById);

module.exports = userRouter;