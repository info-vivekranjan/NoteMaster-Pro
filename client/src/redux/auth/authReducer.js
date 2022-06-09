import { AUTH_LOADING, AUTH_SUCCESS, AUTH_FAILURE } from "./authActionTypes";

const initialState = {
  authLoading: false,
  authSuccess: false,
  authFailure: false,
  authData: [],
  failureData: "",
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: true,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        authSuccess: true,
        authLoading: false,
        authData: payload,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        authLoading: false,
        authFailure: true,
        failureData: payload,
      };
    default:
      return state;
  }
};
