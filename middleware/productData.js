const Product = require("../models/Product.js");



//Grabs Product Data From Database
findProductData = (req, res, next) => {
  Product.find({}, function (err, productData) {
    if (err) {
      console.log(err);
    } else {
      res.send(productData);
      next();
    }
  });
}

// have To Check This Delete If I Cant Tell Use //This Seems To Find One Particular Product
getProductData = function (req, res, next) {
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
  

module.exports = [getProductData, findProductData]


