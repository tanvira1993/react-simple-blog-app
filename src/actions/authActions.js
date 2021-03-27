import * as types from "../constants/ActionTypes";
import * as api from "../constants/ApiUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();

//login actions
export const loginStart = () => ({
  type: types.USER_LOGIN_START,
  payload: {
    loginLoading: true,
    isLoggedin: false,
  },
});

export const loginSuccess = (authInfo) => ({
  type: types.USER_LOGIN_SUCCESS,
  payload: {
    authInfo: authInfo.token,
    profile: authInfo.user,
    isLoggedIn: true,
    loginLoading: false,
  },
});

export const loginFailure = () => ({
  type: types.USER_LOGOUT_SUCCESS,
  payload: {
    isLoggedIn: false,
    authInfo: "",
    profile: "",
  },
});

export const LoginActions = (loginObject, history) => (dispatch) => {
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "*");

    dispatch(loginStart());

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(loginObject),
    };

    fetch(api.login_url, requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([statusCode, data]) => {
        if (statusCode === 200) {
          toast.success("Login successful!!");
          dispatch(loginSuccess(data));
          history.push("/");
        }
        if (statusCode === 401) {
          toast.error(data.error);
          dispatch(loginFailure());
        }
      })

      .catch((error) => {
        toast.error(error);
        dispatch(loginFailure());
      });
  } catch (error) {
    toast.error("Login failed!!");
    dispatch(loginFailure());
  }
};

export const Logout = (history) => (dispatch) => {
  dispatch(loginFailure());
  history.push("/login");
};

//signup actions
export const signupStart = () => ({
  type: types.USER_SIGNUP_START,
  payload: {
    signupLoading: true,
  },
});

export const signupSuccess = () => ({
  type: types.USER_SIGNUP_SUCCESS,
  payload: {
    signupLoading: false,
  },
});

export const signupFailure = () => ({
  type: types.USER_SIGNUP_FAIL,
  payload: {
    signupLoading: false,
  },
});

export const SignupActions = (signupObject, history) => (dispatch) => {
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "*");

    dispatch(signupStart());

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(signupObject),
    };

    fetch(api.signup_url, requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([statusCode, data]) => {
        if (statusCode === 200) {
          toast.success("Signup successful!!");
          dispatch(signupSuccess());
          history.push("/login");
        }
        if (statusCode === 422) {
          toast.error(data.error);
          dispatch(signupFailure());
        }
        // if (statusCode === 401) {
        //   toast.error("Unauthorized!");
        //   dispatch(signupFailure());
        // }
      })

      .catch((error) => {
        toast.error(error);
        dispatch(signupFailure());
      });
  } catch (error) {
    toast.error("Signup failed!!");
    dispatch(signupFailure());
  }
};
