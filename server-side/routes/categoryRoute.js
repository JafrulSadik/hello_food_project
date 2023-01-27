const express = require("express");
const { createCategory, categorylist, updateCategory, getCatProduct } = require("../controllers/category");



const router = express.Router();

router.get('/', categorylist);

router.get('/:categoryUrl', getCatProduct);

router.post('/create', createCategory);

router.patch('/:id', updateCategory);

module.exports = router;