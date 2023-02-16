const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Object,
      },
    ],
    totalPrice: { type: Number, required: true },
    address: {
      type: Object,
      required: true,
    },
    deliveryCharge: { type: Number },
    deliveryStatus: { type: String, default: "Processing" },
    trackLink: {
      type: String,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    refund: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
