const express = require("express");
const { newOrder, userOrders, allOrders } = require("../controllers/order");

const router = express.Router();

router.post("/newOrder", newOrder);

router.get("/allOrders", allOrders);

router.get("/:userId", userOrders);

module.exports = router;
