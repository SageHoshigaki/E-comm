// jshint esversion:6
const { application } = require("express");
const express = require("express");
const router = express.Router();




const getProductAndCartData = require('../middleware/productAndCart.js');
  


router.get("/", getProductAndCartData, function (req, res) {
  res.render("shop", {
    productData: req.productData,
    cartData: req.cartData
  });
  
});

router.post("/", getProductAndCartData, function (req, res) {
 
  res.render("/:productName", {
    productData: req.productData,
    cartData: req.cartData
  });
});

module.exports = router;
