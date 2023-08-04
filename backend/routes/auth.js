require('dotenv').config()
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require("express-validator");
const router = express.Router();




const JWT_SECRET=process.env.REACT_APP_SECRET_KEY

// Route-1 : Created a user using '/api/auth/'. Without any authorisation(No login)
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must contain atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
      //checks whether email exists already in database
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry a user with this email already exists" });
      }

      //Salting and Hashing
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      //   res.send("user");

      const data = {
        user: {
          id: user.id,
        }
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
         res.json({success,"auth-token":authtoken});
    } catch (error) {
      res.status(500).send(success,"Some Error occurs");
    }

    
  }
);

//Route-2: Authenticate a User using POST: "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    
    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success,error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success,error: "Please try to login with correct credentials" });
      }
      // this below data is present in jwt_token ..
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,"auth-token":authtoken});
    } catch (error) {
      res.status(500).send(JWT_SECRET,"Some Error occurs during login");
    }
  }
);

//Route-3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post(
  "/getuser",
  fetchuser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      res.status(500).send("Some Error occurs");
    }
  }
);

module.exports = router;
