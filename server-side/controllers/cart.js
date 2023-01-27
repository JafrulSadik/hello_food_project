const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../error');
const User = require("../models/User");


const cartProduct = async (req, res, next) => {
    try {
        const data = await User.findOne({_id: req.body.id}, {"cart" : 1, "_id" : 0}).populate("cart");
        res.status(200).json(data)
    } catch (error) {
        next(err)
    }
}

const addToCart = async (req, res, next) =>{
    try{
        const data = await User.findOne({_id: req.body.id}, {"cart" : 1, "_id" : 0});

        const isAvailable = data.cart.find((data) => data.toString() === req.body.productId);

        if(isAvailable){
            return next(createError(409, "Product already added to cart."));
        }

        await User.updateOne({_id: req.body.id}, { $push : { cart : req.body.productId}})
        res.status(200).send("Product added to cart successfully!");
    } catch (err){
        next(err);
    }
}


const removeFromCart = async (req, res, next) =>{
    try{
        await User.updateOne({_id: req.body.id}, { $pull : { cart : req.body.productId}})

        res.status(200).send("Product remove from cart successfully!");
    } catch (err){
        next(err);
    }
}


module.exports = {
    addToCart,
    removeFromCart,
    cartProduct
}