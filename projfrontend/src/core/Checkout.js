import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { paymentIntent } from "./helper/paymentHelperCalls";
import CheckoutForm from "./checkoutForm";
import {
  calculatingTotalPrice,
  
} from "./helper/cartHelperCalls";

const stripePromise = loadStripe(
  "####" // secret public key
);

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(calculatingTotalPrice());
  const [clientSecret, setClientSecret] = useState("");
  //const [data,setData]=useState(takingProductFromLocalStorage());

  const getPaymentIntent = () => {
    paymentIntent(totalPrice*100).then((data) => setClientSecret(data.clientSecret));
  };

  useEffect(getPaymentIntent, []);

  
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  const consoling = () => {
    console.log(totalPrice);
  };

  return (
    <div>
      <h2>Hello This is a checkout page</h2>
      
  
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
