import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import Login from "./containers/login";
import AppliedRoute from "./components/AppliedRoute";
import Profile from "./containers/Profile";
import ProductPage from "./containers/ProductPage";
import shopCart from "./containers/shopCart";
import NewProduct from "./containers/NewProduct";

export default function Routes( {appProps} ) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/profile" exact component={Profile} appProps={appProps} />
      <AppliedRoute path="/product/:idProduct" exact component={ProductPage} appProps={appProps} />
      <AppliedRoute path="/shopcart" exact component={shopCart} appProps={appProps} />
      <AppliedRoute path="/np" exact component={NewProduct} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}