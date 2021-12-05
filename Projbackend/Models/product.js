const mongoose=require("mongoose");


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        uppercase:true,
        maxLength:32
    },
    
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    
    description:{
        type:String,
        maxLength:32,
        required:true
    },
    
    price:{
        type:Number,
        required:true
    },
    
    image:{
        data:Buffer,
        contentType:String
    },
    rating:{
        type:Number,
        max:5
    },
    
    stock:Number,
    
    itemsSold:{
        type:Number,
        default:0,
        required:true
    }


},
{
    timestamps:true
}
);


module.exports.product=mongoose.model("Product",productSchema);

