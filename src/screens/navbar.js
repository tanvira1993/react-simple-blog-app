import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Logout } from "../actions/authActions";

const useStyles = (theme) => ({
  button: {
    background: "white",
    color: "black",
    margin: "10px",
    "&:hover": {
      background: "skyblue",
    },
  },
  align: {
    alignSelf: "flex-end",
  },
});
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(Logout(this.props.history));
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <AppBar position="static">
          <Toolbar className={classes.align}>
            {this.props.authInfo === "" ? (
              <>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  className={classes.button}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  color="inherit"
                  className={classes.button}
                >
                  SignUp
                </Button>
              </>
            ) : null}

            {this.props.authInfo !== "" ? (
              <>
                <Button
                  component={Link}
                  to="/"
                  color="inherit"
                  className={classes.button}
                >
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/profile"
                  color="inherit"
                  className={classes.button}
                >
                  Profile
                </Button>
                <Button
                  color="inherit"
                  className={classes.button}
                  onClick={(e) => {
                    this.handleLogout(e);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : null}
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

function mapStateToProps(state) {
  return Object.assign({}, state.auth);
}
export default connect(mapStateToProps)(
  withRouter(withStyles(useStyles)(Navbar))
);
