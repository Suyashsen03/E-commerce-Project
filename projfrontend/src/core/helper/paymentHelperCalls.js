import { isAuthenticated } from "../../auth/helper";
import { CONN } from "../../backend";

export const paymentIntent = (total) => {
  const jwt = isAuthenticated();

  return fetch(` ${CONN}create-payment-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },

    body: JSON.stringify({ amount: total }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
