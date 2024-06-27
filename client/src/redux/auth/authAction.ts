import { setLocalData } from "../../utils/localStorage";
import { AUTH_LOADING, AUTH_SUCCESS, AUTH_FAILURE } from "./authActionTypes";
import axios, { AxiosResponse } from "axios";

export const authLoading = () => ({
  type: AUTH_LOADING,
});

export const authSuccess = (payload: AxiosResponse<any, any>) => ({
  type: AUTH_SUCCESS,
  payload,
});

export const authFailure = (payload: any) => ({
  type: AUTH_FAILURE,
  payload,
});

export const authLogin = (payload: { email: string; password: string; }) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
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
