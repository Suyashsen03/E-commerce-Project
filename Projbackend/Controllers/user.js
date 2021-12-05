const user = require("./../Models/user");
const User = user.user;
const cart = require("./../Models/cart");
const PurchaseCart = cart.purchaseCart


// params 

//one thing that I don't understand is that, why the user will put his _id in the url
// instead he will only use his email-id and password

//investigation required, wait till frontend

module.exports.getUserById = function (req, res, next, id) {
    User.findById(id, function (err, result) {
        if (err) {
            console.log(err);
            return res.send("There is a error in findById param, console.log()");
        } else {
            req.profile = result;
            req.profile.salt = undefined;
            req.profile.encryptedPassword = undefined;

            next();
        }
    })
};

//userById using params
module.exports.userById = function (req, res) {
    res.json({
        "Results found are": req.profile,
        "params in req object": req.params
    });

};

//updateById
module.exports.updateById = function (req, res) {
    User.findByIdAndUpdate(req.profile._id, req.body, { new: true }, function (err, result) {
        if (err) {
            console.log(err)
            return res.send("there is a error check console");
        } else {
            return res.json({ "result": result });
        }
    })
}


//user Purchase List
module.exports.userPurchaseList = function (req, res) {
    PurchaseCart.find({ user: req.profile._id })
        .populate("user")
        .exec((err, result) => {
            if (err) {
                console.log(err);
                return res.json({ message: "No such user found " }) // Investigation required,  
                                                                     
            } else {
                console.log(result)
                return res.json(result);
            }
        })
}



//push_order_in_purchase_list

module.exports.pushOrderPurchaseList = function (req, res, next) {

    let purchases = [];
    // coming from frontend                                   // Investigation required
    req.body.purchaseCart.orders.forEach(product => {              
        purchases.push({                                         //(ORDER.PRODUCTS) WILL GET CLEAR DURING FRONTEND
                                                                // replacement of (purchaseCart.orders)
            _id: product._id,
            description: product.description,
            quantity: product.quantity, // Investigation required 
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    });

    User.findByIdAndUpdate(req.profile._id,
        { $push: { purchases: purchases } },
        { new: true },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.send("there is a error while updating kindly see console.log")
            }
            next();
        });


}


