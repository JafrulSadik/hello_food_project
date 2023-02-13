const express = require("express");
const {
  addToCart,
  removeFromCart,
  cartProduct,
  increaseQuantity,
  decreaseQuantity,
} = require("../controllers/cart");

const router = express.Router();

router.get("/cartProduct/:userId", cartProduct);

router.patch("/addToCart", addToCart);

router.patch("/increageQuantity", increaseQuantity);

router.patch("/decreaseQuantity", decreaseQuantity);

router.patch("/removeFromCart", removeFromCart);

module.exports = router;
