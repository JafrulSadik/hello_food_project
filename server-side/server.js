const express = require("express");
const authRoute = require("./routes/authRoute");
const { default: mongoose } = require("mongoose");
const categoryRoute = require("./routes/categoryRoute");
const cartRoute = require("./routes/cartRoute");
const sliderRoute = require("./routes/sliderRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const dotenv = require("dotenv").config();
const app = express();
const fs = require("fs");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

app.use(
  cors({
    credentials: true,
    origin: "https://hellofood.com.bd",
  })
);

// "https://hellofood.com.bd"
// "http://localhost:3000"

app.use(cookieParser());

const PORT = process.env.PORT || 5000;

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL, (req, res) => {
      console.log("DB connection successfull!");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(express.json());
app.use("/api", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/slider", sliderRoute);
app.use("/api/order", orderRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, (req, res) => {
  connect();
  console.log(`Server is listening on port ${PORT}`);
});
