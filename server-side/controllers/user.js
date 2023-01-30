const createError = require("../error");
const User = require("../models/User");


const allUsers = async (req, res, next) =>{
    try{
        const users = await User.find()

        if(!users){
           return next(createError(204, "No users created yet!"))
        }

        res.status(200).send(users)

    } catch (err){
        return next(err);
    }
}

const singleUser = async (req, res, next) => {
    try{
        const user = await User.findOne({_id : req.params.id});

        
        if(!user){
            return next(createError(404, "User not found!"))
        }
        
        const {password, ...others} = user._doc;

        res.status(200).send(others);
        
    } catch (err){
        return next(err)
    }
}


const deleteUser = async (req, res, next) => {
    try{

        const user = await User.findOne({_id : req.params.id});

        
        if(!user){
            return next(createError(404, "User not found!"))
        }
        
        await User.deleteOne({_id : req.params.id})

        res.status(200).send("User deleted succesfully!");
        
    } catch (err){
        return next(err)
    }
}

module.exports = {
    allUsers,
    singleUser,
    deleteUser
}