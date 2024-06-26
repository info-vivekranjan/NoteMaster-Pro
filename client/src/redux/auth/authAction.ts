import { setLocalData } from "../../utils/localStorage";
import { AUTH_LOADING, AUTH_SUCCESS, AUTH_FAILURE } from "./authActionTypes";
import axios from "axios";

export const authLoading = () => ({
  type: AUTH_LOADING,
});

export const authSuccess = (payload) => ({
  type: AUTH_SUCCESS,
  payload,
});

export const authFailure = (payload) => ({
  type: AUTH_FAILURE,
  payload,
});

export const authLogin = (payload) => (dispatch) => {
  dispatch(authLoading());
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios
    .post(`/user/login`, payload, config)
    .then((response) => {
      dispatch(authSuccess(response));
      setLocalData("userInfo", response?.data?.data);
    })
    .catch((error) => {
      dispatch(authFailure(error));
    });
};
