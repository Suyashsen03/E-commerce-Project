const product = require("./../Models/product");
const Product = product.product;
const { IncomingForm } = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const { Router } = require("express");
const { parse } = require("dotenv");



module.exports.productById = (req, res, next, id) => {

    Product.findById(id)
        .populate("category") // investigation required
        .exec((err, natija) => {
            if (err) {
                return res.status.json({
                    "err": "No product found"
                })
            }
            req.product = natija;
            next();
        });
};


module.exports.createProduct = (req, res) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                "err": "Error while parsing"
            })
        }
        // everything is coming from a form as a object form frontend
        const { name, category, description, price, stock } = fields;

        if (!name || !category || !description || !price || !stock) {
            return res.json({
                "err": "Please provide all the details"
            });
        }

        const newproduct = new Product(fields);

        // handling files here
        if (files.image) {  // during testing do console.log to understand the configuration inside
            if (files.image.size > 30000000) {
                return res.send("Photo size too big");
            };

            newproduct.image.data = fs.readFileSync(files.image.path);
            newproduct.image.contentType = files.image.type;
        };

        // saving to db
        newproduct.save((err, natija) => {
            if (err) {
                console.log(err); 
                return res.status(400).json({
                    "err": "error while saving to database"
                });
            }
            return res.json({
                "natija": natija
            });
        })
    })

};


//Read operation

// get product
module.exports.getProduct = (req, res) => {
    return res.json({
        "product": req.product
    });

}


// middleware, clear this after frontend 
// product photo
module.exports.image = (req, res, next) => {
    if (req.product.image.data) {
        res.set("Content-Type", req.product.image.contentType);
        return res.send(req.product.image.data);
    }
    next();

};

// delete Product
module.exports.deleteProduct = (req, res) => {

    var product = req.product;
    product.remove((err, natija) => {
        if (err) {
            return res.status(400).json({ "err": "Unable to delete from db" });
        }
        return res.json({ "natija": natija });
    });
};

// update Product
module.exports.updateProduct = (req, res) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ "err": "Cannot update document" });
        };
        console.log(req.product);
        // making changes to the fields
        var product1 = req.product;
        product1 = _.extend(product1, fields);  // with help of lodash

        // Handling files here
        if (files.image) {
            if (files.image.size > 3000000) {
                return res.status(400).json({ "err": "Image size exceeded" });
            }
            // making changes to the image, with the help of fs module
            product1.image.data = fs.readFileSync(files.image.path);
            product1.image.contentType = files.image.type;
        }
        console.log( product1);
        
        // saving to db
        product1.save((err, natija) => {
            if (err) {
                return res.status(400).json({ "err": "Error while saving to database" });
            };
            return res.json({ "natija": natija });
        });

    });
};

// get All Products
module.exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";


    Product.find()
        // by frontend and user    
        .limit(limit)
        .select("-image")
        .sort(sortBy)
        .populate("category")
        .exec((err, natija) => {
            if (err) {
                return res.status(400).json({ "err": err });
            };
            return res.json({ "natija": natija });
        })

}



module.exports.getAllUniqueCategories = (req, res) => {  // this is optional, wait till frontend 

    Product.distinct("category", {}, (err, natija) => {
        if (err) {
            return res.status(400).json({ "err": err });
        };
        return res.json({ "natija": natija });

    });
};

// Bulk write,Increasing and decreasing sold and stocks respectively

module.exports.updateStock = (req, res, next) => {
    let myOperations = req.body.purchaseCart.orders.map(elem => {
        return {                                              // our model is named with cart, test it while frontend
            updateOne: {
                filter: { _id: elem._id },
                update: { $inc: { stock: -elem.count, itemSold: +elem.count } }
            }
        }
    })

    Product.bulkWrite(myOperations, {}, function (err, bulkWriteOpResult) {
        if (err) {
            return res.status(400).json({ "err": "Bulk operations failed" });
        };

        next();

    });
}
