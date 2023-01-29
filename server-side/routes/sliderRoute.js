const express = require("express");
const { singleSlider, createSlider, updateSlider, deleteSlider, sliderlist } = require("../controllers/slider");
const { upload } = require("../utils/fileUpload");



const router = express.Router();

//Get all slider
router.get('/', sliderlist);

//Add a product
router.post('/create', upload.single("image"), createSlider);


//Update a slide
router.patch('/:id',upload.single("image"), updateSlider);

//Delete product
router.delete('/:id', deleteSlider);

//get single slider
router.get('/:id', singleSlider);

module.exports = router;