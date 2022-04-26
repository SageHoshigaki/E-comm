// jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

//Import Routes
const shopRoute = require("./routes/shop");
app.use("/shop", shopRoute);

const productRoute = require("./routes/product");
app.use("/product", productRoute);

const accountRoute = require("./routes/account");
app.use("/account", accountRoute);

const checkoutRoute = require("./routes/checkout");
app.use("/checkout", checkoutRoute);

const cartRoute = require("./routes/cart");
app.use("/cart", cartRoute);

//Connect To Database
var mongoDB = "mongodb://localhost:27017/helmutsiteDB";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Routes
app.get("/", function (req, res) {
  res.render("index");
});

//Listen To Server
app.listen(3000, function () {
  console.log("Server is on");
});
