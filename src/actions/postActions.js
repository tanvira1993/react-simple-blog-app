import * as types from "../constants/ActionTypes";
import * as api from "../constants/ApiUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { loginFailure } from "./authActions";
toast.configure();

//post create actions
export const createPostStart = () => ({
  type: types.CREATE_POST_START,
  payload: {
    createPostLoading: true,
  },
});

export const createPostSuccess = () => ({
  type: types.CREATE_POST_SUCCESS,
  payload: {
    createPostLoading: false,
  },
});

export const createPostFailure = () => ({
  type: types.CREATE_POST_FAIL,
  payload: {
    createPostLoading: false,
  },
});

export const PostCreateActions = (dataObject, history, authInfo) => (
  dispatch
) => {
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Bearer " + authInfo);
    headers.append("Origin", "*");

    dispatch(createPostStart());

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(dataObject),
    };

    fetch(api.create_post_url, requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([statusCode, data]) => {
        if (statusCode === 200) {
          toast.success("Post Created successfully!!");
          dispatch(createPostSuccess());
          history.push("/");
        }
        if (statusCode === 422) {
          toast.error(data.error);
          dispatch(createPostFailure());
        }
        if (statusCode === 401) {
          toast.error("Unauthorized!");
          dispatch(loginFailure());
          history.push("/login");
        }
      })

      .catch((error) => {
        toast.error(error);
        dispatch(createPostFailure());
      });
  } catch (error) {
    toast.error("Post Creation failed!!");
    dispatch(createPostFailure());
  }
};

//get posts actions
export const getPostStart = () => ({
  type: types.GET_POSTS_START,
  payload: {
    getPostLoading: true,
  },
});

export const getPostSuccess = (data) => ({
  type: types.GET_POSTS_SUCCESS,
  payload: {
    getPostLoading: false,
    posts: data,
  },
});

export const getPostFailure = () => ({
  type: types.GET_POSTS_FAIL,
  payload: {
    getPostLoading: false,
  },
});

export const PostsGetActions = (history, authInfo) => (dispatch) => {
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Bearer " + authInfo);
    headers.append("Origin", "*");

    dispatch(getPostStart());

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(api.get_posts_url, requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([statusCode, data]) => {
        if (statusCode === 200) {
          dispatch(getPostSuccess(data));
        }
        if (statusCode === 401) {
          toast.error("Unauthorized!");
          dispatch(loginFailure());
          history.push("/login");
        }
      })

      .catch((error) => {
        dispatch(getPostFailure());
      });
  } catch (error) {
    toast.error("Please, try later!");
    dispatch(getPostFailure());
  }
};

//vote handler actions
export const votingtStart = () => ({
  type: types.VOTE_START,
  payload: {
    votingLoading: true,
  },
});

export const votingSuccess = () => ({
  type: types.VOTE_SUCCESS,
  payload: {
    votingLoading: false,
  },
});

export const votingFailure = () => ({
  type: types.VOTE_FAIL,
  payload: {
    votingLoading: false,
  },
});

export const VoteActions = (dataObject, type, history, authInfo) => (
  dispatch
) => {
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Bearer " + authInfo);
    headers.append("Origin", "*");

    dispatch(votingtStart());

    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(dataObject),
    };
    let api_url = "";
    if (type === "up") {
      api_url = api.upvote_url;
    }
    if (type === "down") {
      api_url = api.downvote_url;
    }

    fetch(api_url, requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([statusCode, data]) => {
        if (statusCode === 200) {
          toast.success(`${type}vote added!`);
          dispatch(votingSuccess());
          dispatch(PostsGetActions(history, authInfo));
        }
        if (statusCode === 422) {
          toast.error(data.error);
          dispatch(votingFailure());
        }
        if (statusCode === 401) {
          toast.error("Unauthorized!");
          dispatch(loginFailure());
          history.push("/login");
        }
      })

      .catch((error) => {
        toast.error(error);
        dispatch(votingFailure());
      });
  } catch (error) {
    toast.error("Try later!!");
    dispatch(votingFailure());
  }
};

//comment actions
export const commentCreateStart = () => ({
  type: types.CREATE_COMMENT_START,
  payload: {
    createCommentLoading: true,
  },
});

export const commentCreateSuccess = () => ({
  type: types.CREATE_COMMENT_SUCCESS,
  payload: {
    createCommentLoading: false,
  },
});

export const commentCreateFailure = () => ({
  type: types.CREATE_COMMENT_FAIL,
  payload: {
    createCommentLoading: false,
  },
});

export const CommentActions = (dataObject, history, authInfo) => (dispatch) => {
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Bearer " + authInfo);
    headers.append("Origin", "*");

    dispatch(commentCreateStart());

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(dataObject),
    };

    fetch(api.comment_url, requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([statusCode, data]) => {
        if (statusCode === 200) {
          toast.success("Comment added!!");
          dispatch(commentCreateSuccess());
          dispatch(PostsGetActions(history, authInfo));
        }
        if (statusCode === 422) {
          toast.error(data.error);
          dispatch(commentCreateFailure());
        }
        if (statusCode === 401) {
          toast.error("Unauthorized!");
          dispatch(loginFailure());
          history.push("/login");
        }
      })

      .catch((error) => {
        toast.error(error);
        dispatch(commentCreateFailure());
      });
  } catch (error) {
    toast.error("Try later!!");
    dispatch(commentCreateFailure());
  }
};
