const mongoose = require("mongoose");
const Product = require("../models/Product.js");
const Cart = require("../models/Cart");

var mongoDB =
  "mongodb+srv://Hosh:Bearbrick2@cluster0.e2dla.mongodb.net/helmutsiteDB";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

async function getProductAndCartData(req, res, next) {
  try {
    const productData = await Product.find({}).exec();
    const cartData = await Cart.findOne({ sessionID: req.sessionID })
      .sort({ _id: -1 })
      .exec();

    req.productData = productData;
    req.cartData = cartData;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = getProductAndCartData;
