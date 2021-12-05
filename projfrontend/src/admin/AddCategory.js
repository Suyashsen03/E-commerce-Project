import React, { useState } from "react";
import Base from "../core/Base";
import { talkingToBackend } from "./helper/adminapicall";

//include loading
// make unique categories next time 

// form copy paste

function CreateCategory() {
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
 

  function handleChange(event) {
    setCategory(event.target.value);
  }

  //API calls

  function onSubmit(event) {
    event.preventDefault();
    
    talkingToBackend({ category: category })
      .then((data) => {
        if (data.err) {
          console.log(`error while fetching ${data}`);
          setErr(true);
        } else {
          
          setSuccess(true);
          setCategory("");
        }
      })
      .catch((err) => `error kindly check ${err}`);
  }

  const successMessage = () => {
    if (success) {
      return <p>Category created Successfully</p>;
    }
  };

  const errMessage = () => {
    if (err) {
      return <p>There was error </p>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
    title="Create a category here"
    description="Add a new category for new tshirts"
    className="container bg-info p-4"
    >
     <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errMessage()}
          {myCategoryForm()}
          
        </div>
      </div>
    </Base>
  );
}

export default CreateCategory;
