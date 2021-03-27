import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PostCreateActions } from "../actions/postActions";
import { validateLength } from "../services/validations";

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

class Profile extends Component {
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
    const { title, body } = this.state;
    if (validateLength(title, 3) && validateLength(body, 3)) {
      let data = {
        title: title,
        body: body,
      };
      this.props.dispatch(
        PostCreateActions(data, this.props.history, this.props.authInfo)
      );
    } else {
      if (validateLength(title, 3) === false) {
        toast.error("Name should be greater than 3 character!");
      }
      if (validateLength(body, 3) === false) {
        toast.error("Body should be greater than 3 character!");
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
            Add a post!
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Title"
                  name="title"
                  autoComplete="title"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Body"
                  name="body"
                  autoComplete="body"
                  multiline
                  rows={5}
                  rowsMax={Infinity}
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
              Post
            </Button>
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
  withRouter(withStyles(useStyles)(Profile))
);
