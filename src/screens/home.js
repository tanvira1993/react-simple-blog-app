import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { toast } from "react-toastify";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  PostsGetActions,
  VoteActions,
  CommentActions,
} from "../actions/postActions";
import { DateParser } from "../services";
import { validateLength } from "../services/validations";

const useStyles = (theme) => ({
  root: {
    margin: "10px",
    maxWidth: "150vh",
    minWidth: "150vh",
  },
  avatar: {
    backgroundColor: "skyblue",
  },
  smallAvater: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: "",
      comment: "",
    };
  }
  componentWillMount() {
    if(this.props.authInfo !== ""){
      this.props.dispatch(
        PostsGetActions(this.props.history, this.props.authInfo)
      );
    }
  }
  componentWillReceiveProps(newProps) {
    if (this.state.posts !== newProps.posts) {
      this.setState({ posts: newProps.posts });
    }
  }
  handleVote(postId, type) {
    let data = {
      post_id: postId,
    };
    this.props.dispatch(
      VoteActions(data, type, this.props.history, this.props.authInfo)
    );
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleComment(event, post_id, key) {
    event.preventDefault();
    const { comment } = this.state;
    if (validateLength(comment, 3)) {
      document.getElementById(key + "").value = "";
      let data = {
        text: comment,
        post_id: post_id,
      };
      this.props.dispatch(
        CommentActions(data, this.props.history, this.props.authInfo)
      );
    } else {
      if (validateLength(comment, 3) === false) {
        toast.error("Comment should be greater than 3 character!");
      }
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        {this.state.posts !== ""
          ? this.state.posts.posts.map((value, i) => (
              <Card key={i} className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {value.postedBy.name.split("")[0]}
                    </Avatar>
                  }
                  title={value.title}
                  subheader={DateParser(value.createdAt)}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="h1"
                  >
                    {value.body}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button onClick={() => this.handleVote(value._id, "up")}>
                    <ThumbUpIcon fontSize="small" /> &nbsp;
                    {value.upvotes.length}
                  </Button>
                  <Button onClick={() => this.handleVote(value._id, "down")}>
                    <ThumbDownIcon fontSize="small" /> &nbsp;
                    {value.downvotes.length}
                  </Button>
                </CardActions>
                <CardContent>
                  <Typography variant="subtitle1" component="h2">
                    Comments
                  </Typography>
                  {value.comments.map((comment, j) => (
                    <div key={j}>
                      <Typography variant="subtitle2" component="h4">
                        {comment.postedBy.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        component="h6"
                      >
                        {comment.text}
                      </Typography>
                    </div>
                  ))}
                </CardContent>
                <CardContent>
                  <Grid container spacing={0}>
                    <Grid item xs={11}>
                      <TextField
                        id={i + ""}
                        placeholder="Comment"
                        fullWidth
                        name="comment"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <SendIcon
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          this.handleComment(e, value._id, i);
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          : null}
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return Object.assign({}, state.auth, state.posts);
}
export default connect(mapStateToProps)(
  withRouter(withStyles(useStyles)(Home))
);
