const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../error');
const User = require("../models/User");

const signup = async (req, res, next) =>{
    try{
        //Check wheather email is already exist or not
        const verifyEmail = await User.findOne({"email" : req.body.email}).count();
        if(verifyEmail){
            return next(createError(409, "Email already exist!!!"))
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({...req.body, "password" : hash})
        const resValue = await newUser.save();

        const {password, ...others} = resValue._doc;


        res.status(200).send(others);

    } catch (err){
        return next(err);
    }
}

const login = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return next(createError(404, "User name or Password does not matched."));
        }
        const isCorrect =  await bcrypt.compare(req.body.password, user.password);

        if(!isCorrect){
            return next(createError(404, "User name or Password does not matched."))
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"10s"})
        const {password, ...others} = user._doc;
        res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);

    } catch (err){
        return next(err);
    }
}


const logout = async (req, res, next) => {
    try {
        res.cookie("access_token", "", {
            httpOnly: true
        })
        .status(200)
        .json("Logout successfully.");   
    } catch (error) {
        return next(error)
    }   
}

module.exports = {
    signup,
    login,
    logout
}