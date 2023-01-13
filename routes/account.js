// jshint esversion:6
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cart = require("../models/Cart");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("../models/User");



const app = express();



app.use(session({
  secret: "Our Little Secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());




passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




const getProductAndCartData = require("../middleware/productAndCart.js");

router.get('/', getProductAndCartData, function (req, res) {
  res.render('account', {
    productData: req.productData,
    cartData: req.cartData
  });
  });
  


router.post('/register', function (req, res) {
  User.register({ username: req.body.email}, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect('/account');
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect('/');
      });
    }
  })
});

router.post('/', function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function (err) { 
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function (err) { 
        res.redirect("/");
      })
    }
  })

});





router.get('/register', function (req, res) {
  res.render('register');
});

module.exports = router;
  

