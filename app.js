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


const getProductAndCartData = require("./middleware/productAndCart");
const { spawnCartSession } = require("./middleware/cartData");

app.use("/", spawnCartSession, getProductAndCartData);


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












//Routes











app.get("/", function (req, res) {

  
  res.render("index", {
    productData: req.productData,
    cartData: req.cartData
 })
});



app.post('/delete', async function (req, res) {
  let itemToDelete = req.body.remove;
  let currentUrl = req.body.name;
  let currentSessID = req.sessionID;
  let shoppingBag = req.session.cart.products;
  let cartTotal = req.session.cart.total;
  

  const findItemInCart = function(element) {
    return element.itemName === itemToDelete;
  }




  function updatePrice(itemIndexNumber) {
    let basePrice = shoppingBag[itemIndexNumber].price / shoppingBag[itemIndexNumber].qty;
    let updatePrice = shoppingBag[itemIndexNumber].price - basePrice;
    return shoppingBag[itemIndexNumber].price = updatePrice;
}

  function removeOne(itemIndexNumber) {
    return (shoppingBag[itemIndexNumber].qty -= 1);
    
  }



  let itemIndexNumber = shoppingBag.findIndex(findItemInCart);

  if (shoppingBag[itemIndexNumber].qty <= 1) {
    let newShoppingBag = shoppingBag.filter(function (products) {
      return products.itemName !== itemToDelete;
    });
    shoppingBag = newShoppingBag;
    req.session.cart.products = newShoppingBag;
  } else if (shoppingBag[itemIndexNumber].qty > 1) {
    updatePrice(itemIndexNumber);
    removeOne(itemIndexNumber);
  } else {
    console.log("check logic Shouldnt be here");
  }

  if (shoppingBag === []){
    req.session.cart.total = 0;
  } 



  let valuesToCalc = [];
  let initialValue = 0;
    
  for (let i = 0; i < shoppingBag.length; i++) {
    valuesToCalc.push(shoppingBag[i].price);
    initialValue += valuesToCalc[i];
    req.session.cart.total = initialValue;
    cartTotal = initialValue;
  } 

  
  console.log(shoppingBag);
 

  try {
    //Find the cart in the database using the session ID
    const cartToUpdate = await Cart.findOne({ sessionID: currentSessID });
    //Modify the cart
    cartToUpdate.products = shoppingBag;
    cartToUpdate.total = cartTotal;
    //Save the modified cart
    await cartToUpdate.save();
    res.redirect(currentUrl);
} catch (err){
    console.log(err)
    res.send('Error updating cart')
}


});


app.get('/ordersum', function (req, res) {
  res.render("ordersum");
});








//Listen To Server


app.listen(PORT, function () {
  console.log("Server is on");
});


