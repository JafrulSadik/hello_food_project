const express = require("express");
const { addToCart, removeFromCart, cartProduct } = require("../controllers/cart");



const router = express.Router();

router.get('/cartProduct', cartProduct)

router.patch('/addToCart', addToCart);

router.patch('/removeFromCart', removeFromCart)

module.exports = router;