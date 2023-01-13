const { application } = require("express");
const Cart = require("../models/Cart.js");

// Gets Latest Cart Might Not Need To Use For User Sessions.
exports.getLatestCart = (req, res, next) => {
  Cart.findOne({}, null, { sort: { _id: -1 } }, function (err, cartData) {
    if (err) {
      console.log(err);
    } else {
      res.render("product", { cartData: cartData });
    }
  });
}


exports.spawnCartSession = (req, res, next) => { 
  if (!req.session.cart) {
    let cart = new Cart({
      sessionID: req.sessionID,
      products: [],
      total: 0,
    });
    req.session.cart = cart;
    cart.save();

  }
  next();
}


