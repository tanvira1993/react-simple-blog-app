import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class CustomProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;
    if (!this.props.isLoggedIn) {
      return <Redirect to={{ pathname: "/login" }} />;
    } else {
      return <Component />;
    }
  }
}

function mapStateToProps(state) {
  return Object.assign({}, state.auth);
}

export default connect(mapStateToProps)(withRouter(CustomProtectedRoute));
