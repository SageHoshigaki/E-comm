require("dotenv").config();

const stripe = require("stripe")(process.env.SECRET_KEY);

const express = require("express");
const router = express.Router();

const YOUR_DOMAIN = "http://localhost:3030";

//middleware to load cart&product data
const getProductAndCartData = require("../middleware/productAndCart.js");

router.post(
  "/create-checkout-session",
  getProductAndCartData,
  async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: req.session.cart.products.map((item) => {
                  return item.itemName;
                }),
                images: ["https://i.imgur.com/EHyR2nP.png"],
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
      });
      // Redirect the user to the Stripe-hosted checkout page
      res.redirect(303, session.url);
    } catch (e) {
      console.log(e);
    }
  }
);

module.exports = router;
