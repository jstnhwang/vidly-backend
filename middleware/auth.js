const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("User does not have authorised access to do this action");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = auth;
