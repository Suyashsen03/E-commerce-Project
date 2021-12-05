import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateCategory from "./admin/AddCategory";
import CreateProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Cart from "./core/Cart";
import Home from "./core/Home";
import adminDashBoard from "./user/AdminDashBoard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import userDashBoard from "./user/UserDashBoard";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/signin">
          <Signin />
        </Route>

        <Route exact path="/cart">
          <Cart />
        </Route>

        <PrivateRoute exact path="/user/dashboard" component={userDashBoard} />
        <AdminRoute exact path="/admin/dashboard" component={adminDashBoard} />
        {
          //https://reactrouter.com/web/api/Route
        }

        <AdminRoute
          exact
          path="/admin/create/category"
          component={CreateCategory}
        />
        <AdminRoute
          exact
          path="/admin/create/product"
          component={CreateProduct}
        />
        <AdminRoute exact path="/admin/products" component={ManageProducts} />
        <AdminRoute
          exact
          path="/admin/products/update/:productId"
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
