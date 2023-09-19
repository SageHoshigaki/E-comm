// jshint esversion:6
const express = require("express");
const router = express.Router();
const body = require("body-parser");
const _ = require("lodash");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

//cart logic module
const cartLogic = require("../module/cartlogic");

//middleware to load cart&product data
const getProductAndCartData = require("../middleware/productAndCart.js");
const { request } = require("express");
const { update } = require("../models/Cart");

router.get("/", getProductAndCartData, function (req, res) {
  res.render("products", {
    productData: req.productData,
    cartData: req.cartData,
  });
});

router.get("/:productName", getProductAndCartData, function (req, res) {
  var itemLog = req.params.productName.substring(0);

  Product.findOne({ itemName: itemLog })
    .then((productData) => {
      res.locals.productData = productData;
      res.render("product", {
        productData,
        extraProductData: req.productData,
        cartData: req.cartData,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", getProductAndCartData, async function (req, res) {
  const cart = req.cartData;
  const shoppingBag = req.session.cart.products;
  let incomingItem = req.body.addcart;
  let caughtPrice = parseInt(req.body.price);
  const sess = req.sessionID;
  let cartTotal = req.session.cart.total;

  console.log(req.session.cart);

  let totalPrice = cartLogic.calculateTotalPrice(shoppingBag);

  const updateQty = function (cartItemIndex) {
    return (shoppingBag[cartItemIndex].qty += 1);
  };

  const updatePrice = function (index) {
    if (shoppingBag[index] && shoppingBag[index].qty) {
      let newPrice = shoppingBag[index].qty * caughtPrice;
      return (shoppingBag[index].price = newPrice);
    }
  };
  /*const updatePrice = function (index) {
    let newPrice = shoppingBag[index].qty * caughtPrice;
    console.log(shoppingBag);
    console.log(shoppingBag[index]);
    return (shoppingBag[index].price = newPrice);
  };*/

  const emptyCart = function (shoppingBag) {
    return shoppingBag.length;
  };

  const findItemInCart = function (element) {
    return element.itemName === incomingItem;
  };

  const checkItemExist = function () {
    let itemIndexNumber = shoppingBag.findIndex(findItemInCart);
    if (itemIndexNumber === -1) {
      addToCart(incomingItem, caughtPrice);
      updatePrice(itemIndexNumber);
    } else {
      updateQty(itemIndexNumber);
      updatePrice(itemIndexNumber);
      //console.log((updateCartTotal()));
    }
  };

  const addToCart = function (item, caughtPrice) {
    return shoppingBag.push({ itemName: item, price: caughtPrice, qty: 1 });
  };

  //The statement That Starts the loop
  if (emptyCart(shoppingBag) === 0) {
    addToCart(incomingItem, caughtPrice);
    total = caughtPrice;
    req.session.cart.total = total;
    cartTotal = total;
  } else {
    checkItemExist(incomingItem, shoppingBag);
    /*await cart.save(cart, function (err) {
      if (err) {
        console.log(err);
        return;
      }
    });*/
  }

  let valuesToCalc = [];
  let initialValue = 0;

  for (let i = 0; i < shoppingBag.length; i++) {
    if (typeof shoppingBag[i].price === "number") {
      valuesToCalc.push(shoppingBag[i].price);
      initialValue += valuesToCalc[i];
    } else {
      valuesToCalc.push(0);
    }
    req.session.cart.total = initialValue;
    cartTotal = initialValue;
  }

  try {
    const Updatedcart = await Cart.findOneAndUpdate(
      { sessionID: sess },
      { $set: { products: shoppingBag, total: cartTotal } },
      { new: true }
    );
    if (Updatedcart) {
      res.redirect("/product/" + incomingItem);
    }
  } catch (err) {
    console.log(err);
    res.send("Error updating cart");
  }
});

module.exports = router;
