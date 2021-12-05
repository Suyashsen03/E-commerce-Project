import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

function currentTab(history, path) {
  if (history.location.pathname === path) return { color: "#2ecc72" };
  else return { color: "#FFFFFF" };
}

function Menu(props) {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link
            to="/" // clear this to confusion
            style={currentTab(props.history, "/")} //withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
            className="nav-link"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/cart"
            style={currentTab(props.history, "/cart")}
            className="nav-link"
          >
            Cart
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated.role === 0 && (
          <li className="nav-item">
            <Link
              to="/user/dashboard"
              style={currentTab(props.history, "/user/dashboard")}
              className="nav-link"
            >
              U Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().role === 1 && (
          <li className="nav-item">
            <Link
              to="/admin/dashboard"
              style={currentTab(props.history, "/admin/dashboard")}
              className="nav-link"
            >
              A dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <>
            {/*  Above <> and below </> is <React.Fragment>
                    <ChildA />
                    <ChildB />
                    <ChildC />
                  </React.Fragment> */}

            <li className="nav-item">
              <Link
                to="/signup"
                style={currentTab(props.history, "/signup")}
                className="nav-link"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signin"
                style={currentTab(props.history, "/signin")}
                className="nav-link"
              >
                Signin
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  props.history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Menu);
