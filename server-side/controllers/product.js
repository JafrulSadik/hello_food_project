const Product = require("../models/Product");
const Category = require("../models/Category");
const { fileSizeFormatter } = require("../utils/fileUpload");
const fs = require("fs");
const createError = require("../error");
const cloudinary = require("cloudinary").v2;

//All products list
const allProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate({
      path: "_category",
      select: "name _id",
    });

    res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
};

//Add new product
const addProduct = async (req, res, next) => {
  try {
    const { name, category } = req.body;

    const regex = /[^a-zA-Z0-9 ]/g;

    let productUrl = name.toLowerCase().replace(regex, "").replace(/ /g, "-");

    //Check duplicate product name
    let dupProductName = await Product.findOne({ productUrl });

    if (dupProductName) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {});
      }
      return next(createError(409, "Duplicate product name found!!!"));
    }

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
        _id: req.body.category,
      },
      {
        $push: {
          products: productSave,
        },
      }
    );

    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        return next(err);
      });
    }

    res.status(200).send("Product added succesfully!");
  } catch (err) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {});
    }
    return next(err);
  }
};

//get a single product
const singleProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      productUrl: req.params.productUrl,
    }).populate({ path: "_category", select: "name _id categoryUrl" });

    if (!product) return res.status(404).send("Product not found!");

    res.status(200).send(product);
  } catch (err) {
    return next(err);
  }
};

//Update a product
const updateProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      publicid,
      imgUrl,
      quantity,
      price,
      description,
      productCode,
      id,
      weight,
    } = req.body;

    let discount = req.body.discount;

    if (discount === "NaN") {
      discount = "";
    }

    if (!name || !category || !price || !productCode) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          return next(err);
        });
      }
      return next(createError(404, "Something went wrong !!!"));
    }

    const regex = /[^a-zA-Z0-9 ]/g;

    let productUrl = name.toLowerCase().replace(regex, "").replace(/ /g, "-");

    const dupProductName = await Product.findOne({
      _id: { $ne: id },
      productUrl,
    });

    if (dupProductName) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          return next(err);
        });
      }
      return next(
        createError(409, "Duplicate name found! Please change the name.")
      );
    }

    const dupProductCode = await Product.findOne({
      _id: { $ne: id },
      productCode,
    });

    if (dupProductCode) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          return next(err);
        });
      }
      return next(
        createError(
          409,
          "Duplicate code found! Please change the product code."
        )
      );
    }

    // handle image upload
    let uploadedFile = {
      url: imgUrl,
      publicid: publicid,
    };

    if (req.file) {
      // Delete previous one first
      await cloudinary.uploader.destroy(publicid);

      // Save image to cloudinary
      uploadData = await cloudinary.uploader.upload(req.file.path, {
        folder: "hallo_food/product_image",
        resource_type: "image",
      });

      uploadedFile = {
        url: uploadData.secure_url,
        publicid: uploadData.public_id,
      };
    }

    // pull first
    const product = await Product.findById({ _id: id });

    await Category.updateOne(
      {
        _id: product._category.toString(),
      },
      {
        $pull: {
          products: id,
        },
      }
    );

    // set new category
    await Category.updateOne(
      {
        _id: req.body.category,
      },
      {
        $addToSet: {
          products: id,
        },
      }
    );

    await Product.findByIdAndUpdate(id, {
      $set: {
        name,
        productUrl,
        _category: category,
        quantity,
        price,
        discount,
        description,
        productCode,
        img: uploadedFile,
        weight,
      },
    });

    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        return next(err);
      });
    }

    res.status(200).send("Product updated successfully!");
  } catch (err) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        return next(err);
      });
    }
    return next(err);
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

    await Category.updateOne(
      {
        _id: product._category.toString(),
      },
      {
        $pull: {
          products: productId,
        },
      }
    );

    const publicid = product.img.publicid;

    await cloudinary.uploader.destroy(publicid);

    await Product.deleteOne({ _id: productId });

    res.status(200).send("Product deleted succesfully!");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addProduct,
  allProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
};
