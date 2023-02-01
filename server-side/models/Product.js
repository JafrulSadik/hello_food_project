const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    _category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    productUrl: {
      type: String,
      required: true,
    },
    img: {
      type: Object,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
