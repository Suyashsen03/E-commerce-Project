import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminapicall";

function CreateProduct() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    categories: "",
    image: "",
    error: "",
    formData: "",
    createdProduct: "",
    success: 0,
  });

  const {
    name,
    description,
    price,
    stock,

    categories,

    formData,
  } = productData;

  const preload = () => {
    getAllCategories()
      .then((data) => {
        if (data.err) {
          setProductData((productData) => ({
            ...productData,
            error: data.err,
          }));
        } else {
          setProductData((productData) => ({
            ...productData,
            categories: data.result,
            formData: new FormData(),
          }));
          //console.log(productData);
        }
      })
      .catch((err) => console.log(`Error in preload method ${err}`));
  };

  useEffect(() => {
    preload();
    //console.log(productData.success);
  }, []);

  //high order function
  const handleChange = (x) => (event) => {
    const values = x === "image" ? event.target.files[0] : event.target.value;
    console.log(`${x} is ${values}`);
    formData.set(x, values); //can also be written as productData.formData; // state should not be manipulated directly, must have used setState // just following the course
    setProductData((productData) => ({ ...productData, [x]: values })); // [x] is a way of writing property of object where [x] is a "x",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProductData((productData) => ({ ...productData, error: "" }));
    createProduct(formData) // submitting the form
      .then((data) => {
        if (data.err) {
          setProductData((productData) => ({
            ...productData,
            error: data.err,
          }));
          console.log(`error in submiting the product ${data.err}`);
        } else {
          setProductData((productData) => ({
            ...productData,
            name: "",
            description: "",
            category: "",
            price: "",
            stock: "",
            image: "",
            error: "",
            categories: "",
            createdProduct: data.natija.name,
            success: true,
          }));

          preload();
        }
      })
      .catch((err) => console.log(`error in submiting ${err}`));
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("image")} // this is due to binding of this, complete article in Register also in the ms word with link
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories && // why categories is used here
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.category}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  const successMessage = () => {
    console.log(productData.createdProduct);
    console.log(productData);

    return <p>{productData.createdProduct} created successfully</p>;
  };

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
    >
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}

          {createProductForm()}
        </div>
      </div>
    </Base>
  );
}

export default CreateProduct;
