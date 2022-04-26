const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products:[],
    total: Number
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = mongoose.model("Cart", cartSchema);
