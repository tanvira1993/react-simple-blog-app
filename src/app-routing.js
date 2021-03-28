import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./screens/home";
import Profile from "./screens/profile";
import Signup from "./screens/signup";
import Login from "./screens/login";
import CustomProtectedRoute from "./protector";

function Routing() {
  return (
    <Switch>
      <CustomProtectedRoute exact path="/" component={Home} />
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <CustomProtectedRoute exact path="/profile" component={Profile} />
    </Switch>
  );
}

export default Routing;
