const express = require("express");
const { createCategory, categorylist } = require("../controllers/category");
const { allProducts, addProduct, singleProduct, deleteProduct, updateProduct } = require("../controllers/product");
const { upload } = require("../utils/fileUpload");



const router = express.Router();

//Get all product
router.get('/', allProducts);

//Add a product
router.post('/add_product', upload.single("image"), addProduct);

//Get a single product
router.get('/:productUrl', singleProduct);

//Update a product
router.patch('/:id',upload.single("image"), updateProduct);

//Delete product
router.delete('/:productId', deleteProduct)

module.exports = router;