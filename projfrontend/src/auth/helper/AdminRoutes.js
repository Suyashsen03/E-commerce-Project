import { Redirect, Route } from "react-router";
import { isAuthenticated } from ".";

function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().role === 1 ? (
          <Component {...props} /> // You can spread routeProps to make them available to your rendered Component
        ) : (
          // https://reactrouter.com/web/api/Route
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default AdminRoute;
