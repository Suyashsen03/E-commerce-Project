const express = require("express");
const router = express.Router();
const sign = require("../Controllers/sign");
const { body } = require("express-validator");

//signup route
router.post(
  "/signup",

  body("firstName").notEmpty().isAlpha(),
  //body("lastName").notEmpty().isAlpha(),
  body("email").isEmail(),
  body("password").isStrongPassword(),

  sign.signup
);

// Signin Route
router.post(
  "/signin",
  body("email").isEmail(),
  body("password").notEmpty(),

  sign.signin
);

//signout
router.get("/signout", (req, res) => {
  res.clearCookie("token");
  return res.json({"msg":"You are succesfully signed out"});
});

// Sign_in_check
router.get("/sign_in_test", sign.signInCheck, (req, res) => {
  return res.json({ msg: req.auth });
});

module.exports.signRoutes = router;

// there are following methods available in the sign controllers
// checking signin
// is Authenticated
//  is Admin
