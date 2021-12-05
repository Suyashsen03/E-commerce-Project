import { Redirect, Route } from "react-router";
import { isAuthenticated } from ".";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (                           // this is isAuthenticated
          <Component/>                                  // this is a userDashboard page
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}

export default PrivateRoute;
