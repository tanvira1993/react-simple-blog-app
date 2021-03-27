import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SignupActions } from "../actions/authActions";
import {
  validateEmail,
  validateNull,
  validateLength,
  validatePasswordConfirmation,
} from "../services/validations";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, password, repassword } = this.state;
    if (
      validateEmail(email) &&
      validateNull(password) &&
      validateNull(repassword) &&
      validateLength(name, 3) &&
      validatePasswordConfirmation(password, repassword)
    ) {
      let data = {
        name: name,
        email: email,
        password: password,
      };
      this.props.dispatch(SignupActions(data, this.props.history));
    } else {
      if (validatePasswordConfirmation(password) === false) {
        toast.error("Password doesn't match!");
      }
      if (validateEmail(email) === false) {
        toast.error("Invalid email address");
      }
      if (validateLength(name, 3) === false) {
        toast.error("Name should be greater than 3 character!");
      }
      if (validateNull(password) === false) {
        toast.error("Please, choose a password!");
      }
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  autoComplete="name"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="repassword"
                  label="Repeat Password"
                  type="password"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                this.handleSubmit(e);
              }}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return Object.assign({}, state.auth);
}
export default connect(mapStateToProps)(
  withRouter(withStyles(useStyles)(Signup))
);
