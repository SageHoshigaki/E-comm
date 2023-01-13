// jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const  mongoDBConnection  = require("./dataBase");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");
const _ = require("lodash");
const Cart = require("./models/Cart");
const PORT = process.env.PORT || 3030;
const User = require("./models/User");

const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


const oneDay = 1000 * 24 * 60 * 60;
app.use(session({
  secret: "Our Little Secret.",
  resave: false,
  cookie: { maxAge: oneDay },
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl:"mongodb+srv://Hosh:Bearbrick2@cluster0.e2dla.mongodb.net/helmutsiteDB" }),
})
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());







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



const getProductAndCartData = require("./middleware/productAndCart");
const { spawnCartSession } = require("./middleware/cartData");








//Routes


app.use("/", spawnCartSession, getProductAndCartData);


app.get("/", function (req, res) {
  
  res.render("index", {
    productData: req.productData,
    cartData: req.cartData
 })
});



app.post('/delete', function (req, res) {
  let itemToDelete = req.body.remove;
  let currentUrl = req.body.url;
  
});


app.get('/ordersum', function (req, res) {
  res.render("ordersum");
});

//Listen To Server


app.listen(PORT, function () {
  console.log("Server is on");
});


