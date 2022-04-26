const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Cart = require("../models/Cart");

router.get("/", function (req, res) {
  Cart.findOne({}, function (err, cartData) {
    if (err) {
      console.log(err);
    } else {
      res.json(cartData);
    }
  });
});

module.exports = router;
