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
  "pk_test_51JxcamSCacZxdBMWISsnsN4czwQjpY3XsDyTY1eie4Mm0cpi2Xb1MwypXxk6XUTyZwk5bpBH9M0NEZuK3laNxh7U00OGLHtQUb"
);

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(calculatingTotalPrice());
  const [clientSecret, setClientSecret] = useState("");
  //const [data,setData]=useState(takingProductFromLocalStorage());

  const getPaymentIntent = () => {
    paymentIntent(totalPrice*100).then((data) => setClientSecret(data.clientSecret));
  };

  useEffect(getPaymentIntent, []);

  // calculating the total price
  // An assignment operator assigns a value to its left operand based on the value of its right operand.
  // const calculatingTotalPrice = () => {
  //   let amount = 0;
  //   console.log(data);
  //    return data&&data.map((element) => {
  //     amount = amount + element.price;
  //     setTotalPrice((prev)=>({...prev,price:amount}));
  //   });

  //   //return <h3>Total Amount is ${amount}</h3>;
  // };

  // const showPaymentButton = () => {
  //   return isAuthenticated() ? (
  //     <button>Pay</button>
  //   ) : (
  //     <Link to="/signin">Signin</Link>
  //   );
  // };
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
      {/*       
      {calculatingTotalPrice()}
       */}
      
      {totalPrice}
      {/*       
      {showPaymentButton()}

       */}

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
