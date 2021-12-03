const mongoose=require("mongoose");

const categorySchema=new mongoose.Schema({
    category:{
        type:String,
        uppercase:true,
        maxlength:20,
        required:true,
        
    },
    description:{
        type:String,
        maxlength:32
    }
},
{
    timestamps:true
}
);



module.exports.category=mongoose.model("Category",categorySchema);



