// jshint esversion:6
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Cart = require("../models/Cart");
const Product = require("../models/Product");

//middleware to load cart&product data
const getProductAndCartData = require('../middleware/productAndCart.js');
const { request } = require("express");

// This is your test secret API key.
const stripe = require('stripe')('sk_test_51IRhEoJiA2NI3A0sPleog8119WKDQac3931ALbKpsaisdS0xQaXkV9PmOG3GYAcNHwEZaH4gEyj7N1aLi1aoAqtW00lDzgb2J2');


const YOUR_DOMAIN = 'localhost3030';

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});




router.use('/', getProductAndCartData);









router.get('/', function (req, res) { 

  res.render('checkout', {
    productData: req.productData,
    cartData: req.cartData
  });
})




  module.exports = router;