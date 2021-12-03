const express=require("express");
const router = express.Router();

const sign=require("./../Controllers/sign");
const user=require("./../Controllers/user");
const category=require("./../Controllers/category");





// param
// getting admin by his _id, SOMEHOW

router.param("categoryId",category.categoryParam);
router.param("userId",user.getUserById);

//Create

router.post("/category/create/:userId",sign.signInCheck, sign.isAuthenticated, sign.isAdmin, category.creatingCategory);

// Read
// Anyone can see category, so no need of middlewares

router.get("/category/read/:categoryId", category.readingCategory);
router.get("/category/readCategoryCollection", category.collection);



//Update
router.put("/category/update/:userId/:categoryId", sign.signInCheck, sign.isAuthenticated, sign.isAdmin ,category.updateCategory);

//Delete
router.delete("/category/delete/:userId/:categoryId", sign.signInCheck, sign.isAuthenticated, sign.isAdmin ,category.removeCategory);


module.exports.categoryRoute=router;