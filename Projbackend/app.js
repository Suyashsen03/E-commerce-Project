const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sign = require("./Routes/sign");
const user = require("./Routes/user");
const category = require("./Routes/category");
const product = require("./Routes/product");
const cart = require("./Routes/cart");
const  payment  = require("./Routes/payment");

const app = express();
const port = 5000;

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sign.signRoutes);
app.use(user.userRoute);
app.use(category.categoryRoute);
app.use(product.productRoutes);
app.use(cart.cartRoutes);
app.use(payment.paymentRoutes);

// Mongodb connection code
mongoose
  .connect("mongodb://localhost:27017/tshirt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => {
    console.log(`Errors while connecting to database are ${err}`);
  });

// Server listening code
app.listen(port, () => {
  console.log("Server started on PORT : ", port);
});

//Homepage
app.get("/", (req, res) => {
  res.json("Welcome to the localhost " + port);
});


