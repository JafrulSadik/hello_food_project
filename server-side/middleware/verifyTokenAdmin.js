const jwt = require("jsonwebtoken");
const createError = require("../error");

const verifyTokenAdmin = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) return createError(401, "You are not authenticated!");

    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) return createError(403, "Token is not valid!");
        req.user = user;
        console.log(req.user);
        next();
    })
}


module.exports = {
    verifyTokenAdmin,
}