const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err){ 
            localStorage.removeItem("persist:root");
            return res.status(403).json("Token is not valid!");
        }
        res.user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  };


module.exports = {
    verifyToken
}