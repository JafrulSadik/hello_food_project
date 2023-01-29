const express = require("express");
const {verifyToken} = require("../controllers/tokenValidation");
const { test, allUsers, singleUser, deleteUser } = require("../controllers/user");


const router = express.Router();

//Get all user
router.get('/allUsers', allUsers);

//Get single user
router.get('/:id', singleUser);

//Delete user
router.delete('/:id', deleteUser)

module.exports = router;