const category = require("./../Models/category");
const Category = category.category;
const user = require("./../Models/user");
const User = user.user;





// Params
module.exports.categoryParam=(req,res,next,id)=>{

Category.findById(id,(err,Natija)=>{
    if(err){
        return res.status(400).json({
            "err":"No category found"
        });
    };
    req.category=Natija;
    next();
})    
};


// Route handlers
// Create
module.exports.creatingCategory=(req,res)=>{
new Category(req.body).save((err,Natija)=>{
    if(err){
        return res.status(400).json({
            "err":"can't save to DB"
        });
    }
    return res.json({
        "result":Natija
    });

})    
}

//Read

module.exports.readingCategory=(req,res)=>{
  return   res.json({"result":req.category});

}

// Collection reading
module.exports.collection=(req,res)=>{
Category.find().exec((err,Natija)=>{
    if(err){
        return res.status(400).json({
            "err":"No categories found"
        });
    }
    return res.json({
        "result":Natija
    });
});

}


//Update category

module.exports.updateCategory=(req,res)=>{
const change=req.category;
change.category=req.body.category;
change.description=req.body.description;

change.save((err,natija)=>{
    if(err){
        return res.status(400).json({
            "err":"Cannot update the Category"
        });
    }
    return res.json({
        "result":natija
    });
});


}


//Delete category

module.exports.removeCategory=(req,res)=>{
const change=req.category;
change.remove((err,natija)=>{
    if(err){
         console.log(err);
        return res.status(400).json({
            "err":"Cannot delete category"
        });
    }
    return res.json({"result":natija});
});
};



