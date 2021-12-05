const mongoose=require("mongoose");


const singleproductCartSchema=new mongoose.Schema({
    products:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },

    counts:Number,
    totalPrice:Number
},
{
    timestamps:true
}
);

module.exports.singleProductCart=mongoose.model("SingleProductCart",singleproductCartSchema);


const purchaseCartSchema=new mongoose.Schema({
    orders:[singleproductCartSchema],//If this do not work go with objectId populate
    address:String,
    transaction_id:String,
    status:{
        type:String,
        default:"Received",
        enum:["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Total:Number
},
{
    timestamps:true
}
);

module.exports.purchaseCart=mongoose.model("PurchaseCart",purchaseCartSchema);




