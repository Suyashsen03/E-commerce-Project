const mongoose=require("mongoose");
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const userSchema=new mongoose.Schema({
  firstName:{
      type:String,
      require:true,
      lowercase:true,
      trim:true,
      maxLength:32
  },
  lastName:{
      type:String,
      //require:true,
      lowercase:true,
      trim:true,
      maxLength:32
  },
  email:{
      type:String,
      unique:true,
      lowecase:true,
      require:true,
  },
  userinfo: {
    type: String,
    trim: true
  },
   role:{
      type:Number,
      default:0
  },
  purchases:{
      type:Array,
      default:[]
  },
  salt:String,
  
  encryptedPassword:{
      type:String,
    }  
},
{timestamps:true}

);





userSchema.virtual("password")
.set(function(password){
    this._password=password;
    this.salt=uuidv4();
    this.encryptedPassword=this.securePassword(password);
})
.get(function(){
    return this._password;
})





userSchema.methods={
    securePassword:function(password){
        if(!password) 
        return "";
        
        return crypto.createHmac("sha256",this.salt)
            .update(password)
            .digest("hex") 
    },
    
    authenticate:function(password){
        return this.securePassword(password)===this.encryptedPassword
    }
};







 module.exports.user=mongoose.model("User",userSchema);
