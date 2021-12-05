import { CONN } from "../../backend";

export const getAllProducts = () => {
  return fetch(`${CONN}products/getAllProducts`, {
    method: "GET",
  })
    .then(response=>response.json())
    .catch(err=>console.log("Error kindly check",err))
};
