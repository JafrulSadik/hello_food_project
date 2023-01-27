const router = require('express').Router();
const { signup, login, logout } = require('../controllers/auth');



//create a user
router.post("/signup", signup)

//sign in
router.post("/login", login)

//google auth
router.post("/google", )

//logout
router.get("/logout", logout)

module.exports = router;