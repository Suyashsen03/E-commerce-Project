import { isAuthenticated } from "../../auth/helper";
import { CONN } from "../../backend";

// Category calls

// create
export const talkingToBackend = (data) => {
  const jwt = isAuthenticated();

  return fetch(`${CONN}category/create/${jwt._id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
    body: JSON.stringify(data),
    credentials: "same-origin",
  }).then((response) => response.json()); // aage ki karwaayi exported jagah par
};

// read

//category
export const getCategory = (category) => {
  return fetch(`${CONN}category/read/${category}`, {
    method: "GET",
  }).then((response) => response.json());
};

//categories // for drop down list
export const getAllCategories = () => {
  return fetch(`${CONN}category/readCategoryCollection`, {
    method: "GET",
  }).then((response) => response.json());
};

//update
//delete

// product calls

//create
export const createProduct = (data) => {
  const jwt = isAuthenticated();

  return fetch(`${CONN}product/createProduct/${jwt._id}`, {
    method: "POST",
    headers: {
      Accept: "application/json", // why did'nt used content type multipart form data
      Authorization: `Bearer ${jwt.token}`,
    },
    body: data,
    credentials: "same-origin",
  }).then((response) => response.json()); // aage ki karwaayi exported jagah par
};

// Read all products
export const getAllProducts = () => {
  return fetch(`${CONN}products/getAllProducts`, {
    method: "GET",
  }).then((response) => response.json()); // aage ki karwaayi exported jagah par
};

// delete product
export const deleteProduct = (id) => {
  const jwt = isAuthenticated();
  return fetch(`${CONN}products/${id}/${jwt._id}/delete`, {
    method: "DELETE",
    headers: {
      Accept: "application/json", // why did'nt used content type multipart form data
      Authorization: `Bearer ${jwt.token}`,
    },
  }).then((response) => response.json()); 
};

//Read a product
export const getProduct = (productId) => {
  return fetch(`${CONN}products/getProduct/${productId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => response.json());
};

// update a product
export const updateProduct = (data,productId) => {
  const jwt = isAuthenticated();

  return fetch(`${CONN}products/${productId}/${jwt._id}/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json", // why did'nt used content type multipart form data
      Authorization: `Bearer ${jwt.token}`,
    },
    body: data,
    credentials: "same-origin",
  }).then((response) => response.json()) // aage ki karwaayi exported jagah par
};
