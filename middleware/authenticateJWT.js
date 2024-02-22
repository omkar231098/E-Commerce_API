const jwt = require('jsonwebtoken');
require("dotenv").config();
function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if token is invalid
      }
      req.user = user;
      console.log(req.user) // Attach user information to request object
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized if no token provided
  }
}

module.exports = authenticateJWT;
