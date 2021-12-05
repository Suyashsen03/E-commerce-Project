export const addProductToLocalStorage = (product, next) => {
  let cart = [];
  if (document.defaultView) {
    if (document.defaultView.localStorage.getItem("cart")) {
      let productCart = JSON.parse(localStorage.getItem("cart"));
      productCart.push(product);
      localStorage.setItem("cart", JSON.stringify(productCart));
    } else {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  next();
};

export const takingProductFromLocalStorage = () => {
  if (document.defaultView) {
    if (document.defaultView.localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeProductFromLs = (productId,next) => {
  if (document.defaultView) {
    if (document.defaultView.localStorage.getItem("cart")) {
      let productCart = JSON.parse(localStorage.getItem("cart"));
      productCart.map((element, index) => {
        if (element._id === productId) {
          return productCart.splice(index, 1);
        }
      });
      localStorage.setItem("cart",JSON.stringify(productCart));
      next()
    }
  }
};

export const calculatingTotalPrice=()=>{
let data=takingProductFromLocalStorage();
let amount=0;
data.map((element)=>{
amount=amount+element.price;
})
return amount;
}