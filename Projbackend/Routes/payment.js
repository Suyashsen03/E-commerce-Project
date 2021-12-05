const express = require("express");
const router = express.Router();
const sign = require("../Controllers/sign");

const stripe = require("stripe")(
  "####" // place secret private key here
);

router.post(
  "/create-payment-intent",
  //  sign.signInCheck,
  //  sign.isAuthenticated,
  (req, res) => {
    const total = req.body.amount;

    // Create a PaymentIntent with the order amount and currency
    // International payments requires Name address description 
    // this form is gard coded but it can be easilt created using payment intent 
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
