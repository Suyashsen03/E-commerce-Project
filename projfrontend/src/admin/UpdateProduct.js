import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import Base from "../core/Base";
import {
  getAllCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";

function UpdateProduct(props) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    categories: [],
    error: false,
    success: false,
    finalData: "",
  });

  const preload = (productId) => {
    getProduct(productId)
      .then((data) => {
        setValues((prev) => ({
          // See in register about the  previous and updated state
          ...prev,
          finalData: new FormData(),
          name: data.product.name,
          description: data.product.description,
          price: data.product.price,
          stock: data.product.stock,
          category: data.product.category,
        }));
      })
      .catch((err) => console.log(err));

    getAllCategories()
      .then((natija) => {
        setValues((prev) => ({
          ...prev,
          categories: natija.result,
        }));
      })
      .catch((err) => console.log(`Error in preload method ${err}`));
  };

  useEffect(() => preload(props.match.params.productId), []);

  //handleChange

  const handleChange = (event) => {
    event.preventDefault();
    const newValue = event.target.value;
    const x = event.target.name;
    values.finalData.set(x, newValue); // there is need to be worked on this, this way is inappropriate, therefore it breaks the law of source of truth, and controlled components
    setValues((prev) => ({ ...prev, [x]: newValue }));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    updateProduct(values.finalData, props.match.params.productId)
      .then((data) => {
        //console.log(data);
        if (data.err) setValues((prev) => ({ ...prev, error: data.err }));
        else {
          setValues((prev) => ({ ...prev, success: true }));
          console.log(data.natija);
        }
      })
      .catch((err) => console.log(`Error is ${err}`));
  };

  const successMessage = () => {
    if (values.success) {
      return <p>Updated Succesfully</p>;
    }
  };
  const errorMessage = () => {
    if (values.error) {
      return <p>{values.error}</p>;
    }
  };

  const updateProductForm = () => (
    <form>
      
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          name="name"
          className="form-control"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          className="form-control"
          placeholder="Description"
          value={values.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          name="price"
          type="number"
          className="form-control"
          placeholder="Price"
          value={values.price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <select
          name="category"
          className="form-control"
          onChange={handleChange}
          placeholder="Category"
          value={values.category}
        >
          <option>Select</option>
          {values.categories && 
            values.categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.category}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          name="stock"
          type="number"
          className="form-control"
          placeholder="Stock"
          value={values.stock}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleUpdate} className="btn btn-outline-success mb-3">
        Update Product
      </button>
    </form>
  );

  return (
    <div>
      <Base
        title="Update product here!"
        description="Welcome to product Update section"
      >
        {successMessage()}
        {updateProductForm()}
        {errorMessage()}
      </Base>
    </div>
  );
}

export default UpdateProduct;
