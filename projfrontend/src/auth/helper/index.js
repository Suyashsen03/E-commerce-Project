import { CONN } from "./../../backend.js";

export const signup = (user) => {
  console.log(CONN);
  return fetch(`${CONN}signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json", 
    },
    body: JSON.stringify(user),
  }).then((response) => response.json());
};

export const signin = (data) => {
  
  return fetch(`${CONN}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
};

export const authenticate = (data, next) => {
  if (document.defaultView !== undefined) {  // Research of !
    localStorage.setItem("jwt", JSON.stringify(data));
    next(); // this is not a middleware next, it is a callback fn
  }
  else 
  console.log(`ERROR in authentication method`);
};

export const signout = (next) => {
  if (document.defaultView) {
    // document.defaultView returns the window object
    document.defaultView.localStorage.removeItem("jwt");

    next();
    return fetch(`${CONN}signout`, { method: "GET" })
      .then((response) => response.json())
      .then(data=>console.log(data))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (document.defaultView) {
    if (document.defaultView.localStorage.getItem("jwt"))
      return JSON.parse(localStorage.getItem("jwt"));
  } else return false;
};
