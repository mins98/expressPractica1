const app = require("./app");
const port = process.env.PORT;
const Product = require("./models/Product");
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE,{}).then((con) => {//eso devulve una promesa
  console.log("Conected");
});
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});