const router = require('express').Router();
const { signup, login } = require('../controllers/auth');



//create a user
router.post("/signup", signup)

//sign in
router.post("/login", login)

//google auth
router.post("/google", )

module.exports = router;