const Product = require("../models/Product");
const Category = require("../models/Category");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

//All products list
const allProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("_category");

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

//Add new product
const addProduct = async (req, res, next) => {
  try {
    const { name, category, quantity, price, description, productCode } =
      req.body;

    const regex = /[^a-zA-Z0-9 ]/g;

    let productUrl = name
      .toLowerCase()
      .replaceAll(regex, "")
      .replaceAll(" ", "-")
      .trim();

    //Check duplicate product name
    let dupProductName = await Product.findOne({ productUrl });

    if (dupProductName)
      return res
        .status(409)
        .send("Duplicate name found! Please change the name.");

    // handle image upload
    let uploadedFile;
    if (req.file) {
      // Save image to cloudinary
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "hallo_food/product_image",
        resource_type: "image",
      });
    }

    const product = new Product({
      ...req.body,
      _category: category,
      productUrl,
      img: {
        url: uploadedFile.secure_url,
        publicid: uploadedFile.public_id,
      },
    });

    const productSave = await product.save();

    await Category.updateOne(
      {
        _id: req.body._category,
      },
      {
        $push: {
          products: productSave,
        },
      }
    );

    res.status(200).send("Product added succesfully!");
  } catch (err) {
    next(err);
  }
};

//get a single product
const singleProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      productUrl: req.params.productUrl,
    });

    if (!product) return res.status(404).send("Product not found!");

    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};

//Update a product
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(200).send("Product updated successfully!");
  } catch (err) {
    next(err);
  }
};

//Delete a product
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send("product not found");
    }

    const productId = product._id;

    const publicid = product.img.publicid;

    await cloudinary.uploader.destroy(publicid);

    await Product.deleteOne({ _id: productId });

    res.status(200).send("Product deleted succesfully!");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProduct,
  allProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
};
