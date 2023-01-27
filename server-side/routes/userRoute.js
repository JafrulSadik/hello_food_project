const express = require("express");
const {verifyToken} = require("../controllers/tokenValidation");
const { test, allUsers, singleUser } = require("../controllers/user");


const router = express.Router();

//Get all user
router.get('/allUsers', allUsers);

//Get single user
router.get('/:id', singleUser);

module.exports = router;