import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./registerActionTypes";
import axios, { AxiosResponse } from "axios";

export const registerLoading = () => ({
  type: REGISTER_LOADING,
});

export const registerSuccess = (payload: AxiosResponse<any, any>) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const registerFailure = (payload: any) => ({
  type: REGISTER_FAILURE,
  payload,
});

export const authRegister = (payload: FormData) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  dispatch(registerLoading());
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  return axios
    .post(`/user/register`, payload, config)
    .then((response) => {
      dispatch(registerSuccess(response));
    })
    .catch((error) => {
      dispatch(registerFailure(error));
    });
};
