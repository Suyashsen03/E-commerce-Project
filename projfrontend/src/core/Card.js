import React from "react";
import { Redirect } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import {
  addProductToLocalStorage,
  removeProductFromLs,
} from "./helper/cartHelperCalls";
import ProductImage from "./helper/imageAPICalls";

const Card = (props) => {
  // for cart page
  const [redirect, setRedirect] = useState(false);

  // To make card reusable
  const name = props.name ? props.name : "Default Name";
  const description = props.description
    ? props.description
    : "Default description";
  const price = props.price ? props.price : "Default price";

  const redirectMethod = () => {
    setRedirect(true);
  };

  const redirectingToCartPage = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  // Adding method to add product to the local storage and redirect to cart page
  const addToCart = () => {
    return (
      props.showAddToCart && (
        <div className="col-12">
          <button
            onClick={() => {
              addProductToLocalStorage(props.product, redirectMethod);
            }}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        </div>
      )
    );
  };

  const removeFromCart = () => {
    return (
      props.showRemoveFromCart && (
        <div className="col-12">
          <button
            onClick={() => {
              
              removeProductFromLs(props.productId, ()=>{props.setReload(!props.reload)});
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        </div>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{name}</div>
      <div className="card-body">
        <div className="rounded border border-success p-2">
          <ProductImage productId={props.productId} />
        </div>
        <p className="lead bg-success font-weight-normal text-wrap">
          {description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">${price}</p>
        {redirectingToCartPage()}
        <div className="row">
          {addToCart()}
          {removeFromCart()}
        </div>
      </div>
    </div>
  );
};

export default Card;
