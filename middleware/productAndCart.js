const mongoose = require('mongoose');
const Product = require("../models/Product.js");
const Cart = require("../models/Cart");

var mongoDB =
  "mongodb+srv://Hosh:Bearbrick2@cluster0.e2dla.mongodb.net/helmutsiteDB";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });


function getProductAndCartData(req, res, next) {
  const query1 = Product.find({});
  const query2 = Cart.findOne({}, null, { sort: { _id: -1 } });

  Promise.all([query1.exec(), query2.exec()]).then(function(results) {
    req.productData = results[0];
    req.cartData = results[1];
    next();
  }).catch(function(error) {
    console.log(error);
    next(error);
  });
}

module.exports = getProductAndCartData;
