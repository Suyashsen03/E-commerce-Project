import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Base from "./Base";
import Card from "./Card";
import Checkout from "./Checkout";
import { takingProductFromLocalStorage } from "./helper/cartHelperCalls";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const preload = () => {
    setProducts(takingProductFromLocalStorage());
  };
  useEffect(preload, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products &&
          products.map((element, index) => (
            <Card
              key={index}
              showAddToCart={false}
              showRemoveFromCart={true}
              name={element.name}
              description={element.description}
              price={element.price}
              productId={element._id}
              // Here I am passing the state to the card componenet, so that the state can be changed by
              // the card componenet, and the cart componenet cab be rerendered
              // remember from  mdn, that props is always an object, so we can pass down the methods and properties
              // to other components and other componenets can set up the state of other component
              setReload={setReload}
              reload={reload}
            />
          ))}
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">
          <Checkout  />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
