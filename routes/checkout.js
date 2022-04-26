// jshint esversion:6
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');



router.get('/', function(req, res) {
    res.render('checkout');
  });


  module.exports = router;