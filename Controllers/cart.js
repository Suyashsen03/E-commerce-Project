const cart = require("./../Models/cart");
const PurchaseCart = cart.purchaseCart;



module.exports.getOrderById=(req,res,next,id)=>{

    PurchaseCart.findById(id)
    .populate("purchaseCart.orders","name price") // (ORDER.PRODUCTS) WILL GET CLEAR DURING FRONTEND
    .exec((err,natija)=>{                     // though this is associated with our cart model, it should be purchaseCart.orders
        if(err){
            return res.status.json({"err":"No such order found in db"});
        };
        req.order=natija;
        next();
    });

};

module.exports.createOrder=(req,res)=>{
    req.body.purchaseCart.user=req.profile;// this is done for populate purpose, getting user id, can also go with 
    new PurchaseCart(req.body.order)  // destructuring of req.profile like const {_id}=req.profile; 
    .exec((err,natija)=>{             // and then req.body.order.user._id=_id;
        if(err){
            return res.status(400).json({"err":"cannot save to db"});
        };
        return res.json({"natija":natija});
    });
};




module.exports.getAllOrders=(req,res)=>{

    PurchaseCart.find()
    .populate("user", "_id name")
    .exec((err,natija)=>{
        if(err){
            return res.status(400).json({"err":"No orders found"});
        };
        return res.json({"natija":natija});
        
    })
}



module.exports.updateOrderStatus=(req,res)=>{
    PurchaseCart.findByIdAndUpdate(req.body.orderId,{status:req.body.status},(err,natija)=>{
        if(err){
            return res.status(400).json({"err":"cannot update in  db"});
        };
        return res.json({"natija":natija});
           
    });

}

module.exports.allOrderStatus=(req,res)=>{
PurchaseCart.find({},"status",(err,natija)=>{  // Kindly verify this during testing  
    if(err){                                    
        return res.status(400).json({"err":"cannot find status in  db"});
    };
    return res.json({"natija":natija});
    
});
}
