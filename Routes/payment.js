const express = require("express");
const router = express.Router();
const sign = require("../Controllers/sign");

const stripe = require("stripe")(
  "#######" // private key here 
);

router.post(
  "/create-payment-intent",
  //  sign.signInCheck,
  //  sign.isAuthenticated,
  (req, res) => {
    const total = req.body.amount;

    // Create a PaymentIntent with the order amount and currency
    // Name address description are required for international payments 
    // right now it is hard coded but it can be easily taken from the paymentIntent form 
    
    stripe.paymentIntents
      .create({
        description: "Software development services",
        shipping: {
          name: "Jenny Rosen",
          address: {
            line1: "510 Townsend St",
            postal_code: "98140",
            city: "San Francisco",
            state: "CA",
            country: "US",
          },
        },
        amount: total,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      })
      .then((response) => {
        
        res.send({
          clientSecret: response.client_secret,
        });
      })
      .catch((err) => console.log("err is", err));
  }
);

router.get("/orderStaus",(req,res)=>{
    res.json({status:"Order placed successfully"});
})

module.exports.paymentRoutes = router;
