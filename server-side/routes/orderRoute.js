const express = require("express");
const {
  newOrder,
  userOrders,
  allOrders,
  updateOrder,
} = require("../controllers/order");

const router = express.Router();

router.post("/newOrder", newOrder);

router.get("/allOrders", allOrders);

router.get("/:userId", userOrders);

router.patch("/:orderId", updateOrder);

module.exports = router;
