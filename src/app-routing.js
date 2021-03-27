import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "./screens/home";
import Profile from "./screens/profile";
import Signup from "./screens/signup";
import Login from "./screens/login";
import { connect } from "react-redux";

function Routing(props) {
  const history = useHistory();
  useEffect(() => {
    if (props.authInfo === "") {
      history.push("/login");
    } else {
      history.push("/");
    }
  }, [props.authInfo,history]);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
    </Switch>
  );
}

function mapStateToProps(state) {
  return Object.assign({}, state.auth);
}
export default connect(mapStateToProps)(Routing);
