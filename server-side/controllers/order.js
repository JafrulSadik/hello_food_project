const Order = require("../models/Order");
const createError = require("../error");

const newOrder = async (req, res, next) => {
  try {
    const {
      userId,
      name,
      address,
      products,
      email,
      phone,
      deliveryCharge,
      totalPrice,
      paymentMethod,
    } = req.body;
    if (!name || !address || !totalPrice || !products || !phone || !email) {
      return next(createError(404, "Information missing!"));
    }
    const newOrder = new Order({
      userId: userId,
      name: name,
      email: email,
      phone: phone,
      products: products,
      address: address,
      deliveryCharge: deliveryCharge,
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
    });
    const response = newOrder.save();
    res.status(200).json(response?._id);
  } catch (err) {
    return next(err);
  }
};

const allOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
const userOrders = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      next(createError(404, "User not found!"));
    }

    const orders = await Order.find({ userId: userId });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newOrder,
  userOrders,
  allOrders,
};
