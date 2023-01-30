const express = require("express");
const {
  createCategory,
  categorylist,
  updateCategory,
  getCatProduct,
  deleteCategory,
  singleCategory,
} = require("../controllers/category");
const { upload } = require("../utils/fileUpload");

const router = express.Router();

router.get("/", categorylist);

router.get("/:categoryUrl", singleCategory);

router.post("/create", upload.single("image"), createCategory);

router.patch("/:id", upload.single("image"), updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
