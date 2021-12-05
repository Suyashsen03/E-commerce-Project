const express=require("express");
const router = express.Router();
const user=require("./../Controllers/user");
const sign=require("./../Controllers/sign");
const cart=require("./../Controllers/cart");
const product=require("./../Controllers/product");




router.param("userId",user.getUserById);
router.param("orderId",cart.getOrderById);

// create cart

router.post("/orders/create/:userId",
sign.signInCheck,
sign.isAuthenticated,
user.pushOrderPurchaseList,
product.updateStock,
cart.createOrder);

// read cart
router.get("/orders/allOrders",cart.getAllOrders);


// status of cart
router.put("/orders/updateOrder/:orderId/:userId",
sign.signInCheck,
sign.isAuthenticated,
sign.isAdmin,
cart.updateOrderStatus);


router.get("/orders/allOrders/:userId",
sign.signInCheck,
sign.isAuthenticated,
sign.isAdmin,
cart.allOrderStatus
);



module.exports.cartRoutes=router;


