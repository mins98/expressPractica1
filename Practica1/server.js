const mongoose = require("mongoose");
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  console.log("Shutting down");
  process.exit(1);
});
const app = require("./app");
const port = process.env.PORT;
const Product = require("./models/Product");
const User = require("./models/User");
const ShoppingCart = require("./models/ShoppingCart");

mongoose.connect(process.env.DATABASE,{}).then((con) => {//eso devulve una promesa
  console.log("Conected");
});
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
  console.log("Shutting down");
  server.close(() => {
    process.exit(1);
  });
});