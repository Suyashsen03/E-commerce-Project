import { isAuthenticated } from "../../auth/helper";
import { CONN } from "../../backend"

// this method is for order creation, based on the model in the backend 
export const orderCreation =(orderData)=>{
  const jwt = isAuthenticated();
    
    return fetch(`${CONN}orders/create/${jwt._id}`,{
        method:"POST",
        headers: {
            Accept:"application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt.token}`,
        
        },
        body:{purchaseCart:{
            user:JSON.stringify(orderData)
        }}

    }).then().catch()
}


// this method is to empty the cart once te payment is successfull
export const cartEmpty=()=>{
if(document.defaultView){
    localStorage.removeItem("cart");
}
}