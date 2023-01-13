const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    sessionID:String,
    products:[],
    total: Number
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;