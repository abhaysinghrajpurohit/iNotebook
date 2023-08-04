require("dotenv").config();
const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  //Get the user from jwt token and add id to req object;
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
  try {
    const JWT_SECRET = process.env.REACT_APP_SECRET_KEY;
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchuser;
