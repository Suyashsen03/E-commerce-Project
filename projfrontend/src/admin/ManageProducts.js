import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useEffect } from "react/cjs/react.development";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";

// get all products on mounting the component
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState("");

  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data.err) setErr(data.err);
        else {
          setProducts(data.natija);
          // console.log(products) this will not show the updated product state value
          // possible reason can be the way of working of js
          // that is console.log would have been executed in the stack, but setProducts would have been
          // forwarded to the web api container, then to the callback queue, then to the stack
          // so that's why console shows the past value not the updated one
        }
      })
      .catch((err) => {
        console.log("error", err);
        setErr(err);
      });
  };

  useEffect(preload, []);

  // Error message
  const errorMessage = () => {
    return <p> {err}</p>;
  };
  const handleDelete = (id) => {
    deleteProduct(id)
      .then((data) => {
        if (data.err) setErr(data.err);
        else preload();
      })
      .catch((error) => setErr(error));
  };

  return (
    <div>
      <p>Hello there</p>
      {products.map(
        (
          element,
          index // every single time the callback returned the value on each element, that is retuned to the new array, this is map
        ) => (
          <div key={index}>
            <p> {element.name}</p>
            <button onClick={()=>handleDelete(element._id)}>Delete</button>
            <Link to={`/admin/products/update/${element._id}`}>Update</Link>
          </div>
        )
      )}
      {errorMessage()}
    </div>
  );
};

export default ManageProducts;
