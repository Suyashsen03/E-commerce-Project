const express = require("express");
const router = express.Router();
const sign=require("./../Controllers/sign");
const user=require("./../Controllers/user");


//params 
router.param("userId",user.getUserById);
router.get("/user/:userId",sign.signInCheck,sign.isAuthenticated,user.userById);
router.get("/user/update/:userId",sign.signInCheck,sign.isAuthenticated,user.updateById);
router.get("/user/orders/:userId",sign.signInCheck,sign.isAuthenticated,user.userPurchaseList);



module.exports.userRoute=router;

