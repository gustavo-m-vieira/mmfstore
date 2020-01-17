import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import Login from "./containers/login";
import Order from "./containers/order";
import AppliedRoute from "./components/AppliedRoute";
import NewOrder from "./containers/NewOrder";
import Profile from "./containers/Profile";
import ProductPage from "./containers/ProductPage";
import ConfirmOrder from "./containers/confirmOrder";
import NewProduct from "./containers/NewProduct";

export default function Routes( appProps ) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/order" exact component={Order} appProps={appProps} />
      <AppliedRoute path="/order/new" exact component={NewOrder} appProps={appProps} />
      <AppliedRoute path="/profile" exact component={Profile} appProps={appProps} />
      <AppliedRoute path="/product/:idProduct" exact component={ProductPage} appProps={appProps} />
      <AppliedRoute path="/co" exact component={ConfirmOrder} appProps={appProps} />
      <AppliedRoute path="/np" exact component={NewProduct} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}