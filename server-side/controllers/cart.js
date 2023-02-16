const Cart = require("../models/Cart");
const User = require("../models/User");
const { isValidObjectId } = require("mongoose");
const createError = require("../error");

const cartProduct = async (req, res, next) => {
  let userId = req.params.userId;
  let user = await User.findOne({ _id: userId });

  if (!userId || !user) {
    return next(createError(400, "Invalid user ID"));
  }

  let cart = await Cart.findOne({ userId: userId }).populate(
    "products.product"
  );
  if (!cart) {
    return res.status(200).json([]);
  }

  res.status(200).json(cart);
};

const addToCart = async (req, res, next) => {
  let userId = req.body.userId;
  let user = await User.findOne({ _id: userId });

  if (!userId || !user) {
    return next(createError(400, "Invalid user ID"));
  }

  let productId = req.body.productId;
  if (!productId) {
    return next(createError(400, "Invalid product"));
  }

  let cart = await Cart.findOne({ userId: userId });

  if (cart) {
    let itemIndex = cart.products.findIndex((p) => p.product == productId);

    if (itemIndex > -1) {
      return next(createError(409, "Product already in the cart."));
    } else {
      cart.products.push({
        product: productId,
        cartQuantity: req.body.cartQuantity,
      });
    }
    cart = await cart.save();
    return res.status(200).send("Product added successfully");
  } else {
    const newCart = Cart({
      userId,
      products: [{ product: productId, cartQuantity: req.body.cartQuantity }],
    });

    await newCart.save();

    return res.status(201).send("Product successfully created");
  }
};

const decreaseQuantity = async (req, res, next) => {
  // use add product endpoint for increase quantity
  let userId = req.body.userId;
  let user = await User.findOne({ _id: userId });
  let productId = req.body.productId;

  if (!userId || !user) {
    return next(createError(404, "User is not valid!"));
  }

  let cart = await Cart.findOne({ userId: userId });

  if (!cart) {
    return next(createError(404, "Cart not found for this user"));
  }

  let itemIndex = cart.products.findIndex((p) => p.product == productId);

  if (itemIndex > -1) {
    let productItem = cart.products[itemIndex];
    if (productItem.cartQuantity === 1) {
      productItem.cartQuantity = 1;
    } else {
      productItem.cartQuantity -= 1;
    }

    cart.products[itemIndex] = productItem;
    cart = await cart.save();
    return res.status(200).json("Increases the quantity done.");
  }
  return next(createError(400, "Item does not exist!"));
};
const increaseQuantity = async (req, res, next) => {
  // use add product endpoint for increase quantity
  let userId = req.body.userId;
  let user = await User.findOne({ _id: userId });
  let productId = req.body.productId;

  if (!userId || !user) {
    return next(createError(404, "User is not valid!"));
  }

  let cart = await Cart.findOne({ userId: userId });

  if (!cart) {
    return next(createError(404, "Cart not found for this user"));
  }

  let itemIndex = cart.products.findIndex((p) => p.product == productId);

  if (itemIndex > -1) {
    let productItem = cart.products[itemIndex];
    productItem.cartQuantity += 1;
    cart.products[itemIndex] = productItem;
    cart = await cart.save();
    return res.status(200).json("Increases the quantity done.");
  }
  return next(createError(400, "Item does not exist!"));
};

const removeFromCart = async (req, res, next) => {
  let userId = req.body.userId;
  let user = await User.findOne({ _id: userId });
  let productId = req.body.productId;

  if (!userId || !user) {
    return next(createError(404, "User is not valid!"));
  }

  let cart = await Cart.findOne({ userId: userId });
  if (!cart) {
    return next(createError(404, "Cart not found for this user"));
  }

  let itemIndex = cart.products.findIndex((p) => p.product == productId);
  if (itemIndex > -1) {
    cart.products.splice(itemIndex, 1);
    cart = await cart.save();
    return res.status(200).send("Product successfully removed");
  }

  return next(createError(400, "Item does not exist in cart!"));
};

module.exports = {
  addToCart,
  removeFromCart,
  cartProduct,
  increaseQuantity,
  decreaseQuantity,
};
