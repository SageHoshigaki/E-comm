// jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");
const _ = require("lodash");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { add } = require("lodash");
const { append } = require("express/lib/response");

let cart = new Cart({
  products: [],
  total: 0,
});
cart.save();

//const cartItems = cart.products;
//const cartId = "61d7a73b9576731e2634e05a";
//cart.save();

router.get("/", function (req, res) {
  spinUpCart();
  Product.find({}, function (err, productData) {
    if (err) {
      console.log(err);
    } else {
      res.send(productData);
    }
  });
});

let getProductData = function (req, res, next) {
  var itemLog = req.params.productName.substring(0);

  Product.findOne({ itemName: itemLog }, function (err, productData) {
    if (err) {
      next(err);
    } else {
      res.locals.productData = productData;
      next();
    }
  });
};

/*let getLatestCart = function (req, res, next) {
  Cart.findOne({}, function (err, cartData) {
    if (err) {
      next(err);
    } else {
      res.locals.cartData = cartData;
      next();
    }
  });
};*/

router.use("/:productName", getProductData);

router.get("/:productName", function (req, res) {
  var itemLog = req.params.productName.substring(0);
  var itemLogg = _.lowerCase(itemLog);

  Cart.findOne({}, null, { sort: { _id: -1 } }, function (err, cartData) {
    if (err) {
      console.log(err);
    } else {
      res.render("product", { cartData: cartData });
    }
  });
});

router.post("/", function (req, res) {
  const cartItems = cart.products;
  let incomingItem = req.body.addcart;
  let caughtPrice = parseInt(req.body.price);
  let shoppingBag = cart.products;
  let cartTotal = cart.total;

  function updateQty(cartItemIndex) {
    return (shoppingBag[cartItemIndex].qty += 1);
  }

  function updatePrice(index) {
    let newPrice = shoppingBag[index].qty * caughtPrice;
    return (shoppingBag[index].price = newPrice);
  }

  function emptyCart() {
    return cart.products.length;
  }

  const findItemInCart = (element) => element.itemName === incomingItem;

  function checkItemExist() {
    let itemIndexNumber = shoppingBag.findIndex(findItemInCart);
    if (itemIndexNumber === -1) {
      addToCart(incomingItem);
    } else {
      updateQty(itemIndexNumber);
      updatePrice(itemIndexNumber);
      //updateCartTotal();
    }
  }

  function addToCart(item) {
    return cart.products.push({ itemName: item, price: caughtPrice, qty: 1 });
  }

  //The statement That Starts the loop
  if (emptyCart() === 0) {
    addToCart(incomingItem);
  } else {
    checkItemExist();
    /*await cart.save(cart, function (err) {
      if (err) {
        console.log(err);
        return;
      }
    });*/
  }

  /* Update Total*/
  let valuesToCalc = [];
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  for (let i = 0; i < shoppingBag.length; i++) {
    valuesToCalc.push(shoppingBag[i].price);
  }
  let totalPrice = valuesToCalc.reduce(reducer, 0);
  cartTotal = totalPrice;
  cart.total = totalPrice;

  res.redirect("/product/" + incomingItem);
  cart.markModified("products");
  cart.save(cart);
  console.log(cart);
});

module.exports = router;
