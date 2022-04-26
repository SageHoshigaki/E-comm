const mongoose = require('mongoose'); 


const productSchema = new mongoose.Schema({
    img:String,
    storeTitle: String, 
    itemName:String, 
    price:Number, 

  })
  const Product = mongoose.model('Product', productSchema)
  
  module.exports = mongoose.model("Product", productSchema);