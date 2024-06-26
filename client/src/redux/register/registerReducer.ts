import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./registerActionTypes";

const initialState = {
  registerLoading: false,
  registerSuccess: false,
  registerFailure: false,
  registerData: [],
  registerFailureData: "",
};

export const registerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_LOADING:
      return {
        ...state,
        registerLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        registerSuccess: true,
        registerData: payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registerLoading: false,
        registerFailure: true,
        registerFailureData: payload,
      };
    default:
      return state;
  }
};
