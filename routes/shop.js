// jshint esversion:6
const express = require("express");
const router = express.Router();
const productData = require("../itemdata.js");
const Product = require("../models/Product.js");

router.get("/", function (req, res) {
  Product.find({}, function (err, productData) {
    res.render("shop", { productData: productData });
  });
});

router.get("/", function (req, res) {
  res.render("shop");
});

router.post("/", function (req, res) {
  res.redirect("/:productName");
});

module.exports = router;
