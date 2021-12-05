const express=require("express");
const router=express.Router();
const productController=require("./../Controllers/product");
const sign=require("./../Controllers/sign");
const user=require("./../Controllers/user");




//get product by id
router.param("productId",productController.productById);
router.param("userId",user.getUserById);


//create operation

router.post("/product/createProduct/:userId", sign.signInCheck, sign.isAuthenticated, sign.isAdmin, productController.createProduct)

// read operation
router.get("/products/getProduct/:productId",productController.getProduct);
router.get("/products/image/:productId",productController.image);

//delete Route
router.delete("/products/:productId/:userId/delete",sign.signInCheck, sign.isAuthenticated, sign.isAdmin, productController.deleteProduct);

//update Route
router.put("/products/:productId/:userId/update",sign.signInCheck, sign.isAuthenticated, sign.isAdmin, productController.updateProduct);


//getAllProduct  routes
router.get("/products/getAllProducts",productController.getAllProducts);

// unique categories
router.get("/products/categories", productController.getAllUniqueCategories);

module.exports.productRoutes=router;
