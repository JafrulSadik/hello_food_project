const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
      amount: { type: Number, required: true },
      address: { type: Object, required: true },
      status: { type: String, default: "pending" },
      return: {type: String}
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Order", OrderSchema);

