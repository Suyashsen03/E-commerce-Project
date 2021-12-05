// This is ACTING as a TEMPLATE

import React from "react";
import Menu from "./Menu";

const Base = (props) => {
  return (
    <div>
      <Menu/>
      <div className="container-fluid">
        <div className="jumbotron  text-white text-center">
          <h2 className="display-4">{props.title}</h2>
          <p className="lead">{props.description}</p>
        </div>
        <div className={props.className}>{props.children}</div>{" "}
        {/* See in the register(copy)*/}
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you got any questions, feel free to reach out!</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            An Amazing <span className="text-white">MERN</span> Bootcamp
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
