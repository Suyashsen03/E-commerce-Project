const user = require("../Models/user");
const User = user.user;
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
var expressjwt = require("express-jwt");

//signup
module.exports.signup = function (req, res) {
  // Checking validation errors
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result);
    res.json({
      err: "Invalid Values",
    });
  } else {
    new User(req.body).save((err, user) => {
      // Checking mongo errors
      if (err) {
        console.log(err);

        // CHECKING IF EMAIL IS UNIQUE OR NOT
        if (err.code === 11000) {
          return res.json({
            err: {
              message: `${err.keyValue.email} already in use`,
              msg: "Sorry cannot Sign-up",
            },
          });
        }
      } else {
        return res.json({
          newUser: user,
        });
      }
    });
  }
};

//signin
module.exports.signin = function (req, res) {
  // Checking validation errors
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result);
    return res.json({
      err: "Invalid Values",
    });
  } else {
    User.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        // if no user found
        if (user == null) {
          return res.send("No such user found");
        } else {
          if (user.authenticate(req.body.password)) {
            // generating token
            var token = jwt.sign(
              {
                _id: user._id,
              },
              "learnCodeOnline",
              {
                expiresIn: "1d",
              }
            );
            // sending token as cookies
            res.cookie("token", token);
            // Object destructuring
            const { role, _id, firstName, lastName, email } = user;
            // sending found user to the response
            return res.json({
              role: role,
              _id: _id,
              firstName: firstName,
              lastName: lastName,
              email: email,
              token: token,
            });
          } else {
            return res.json({ err: "Wrong combination of email and password" });
          }
        }
      }
    );
  }
};

//middleware
//checking user is signin or not
// Need to work on th error part
module.exports.signInCheck = expressjwt({
  secret: "learnCodeOnline",
  requestProperty: "auth",
});

// custom middlewares

// req.profile will be set by the frontend part, so chill till that time
module.exports.isAuthenticated = function (req, res, next) {
  //  let checker=req.profile && req.auth && req.profile._id == req.auth._id;
  let checker = req.profile._id && req.auth._id;
  if (!checker) {
    return res.status(403).send("ACCESS DENIED");
  }
  next();
};

//admin or not
module.exports.isAdmin = function (req, res, next) {
  if (req.profile.role === 0) {
    return res.status(403).send("not a Admin, access denied");
  }
  next();
};
