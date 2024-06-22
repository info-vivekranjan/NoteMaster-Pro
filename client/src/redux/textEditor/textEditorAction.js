import axios from "axios";
import { getLocalData } from "../../utils/localStorage";
import {
  CREATE_TEXT_EDITOR_REQUEST,
  CREATE_TEXT_EDITOR_SUCCESS,
  CREATE_TEXT_EDITOR_FAILURE,
} from "./textEditorActionTypes";

export const createTextEditorRequest = () => ({
  type: CREATE_TEXT_EDITOR_REQUEST,
});

export const createTextEditorSuccess = (payload) => ({
  type: CREATE_TEXT_EDITOR_SUCCESS,
  payload,
});

export const createTextEditorFailure = (payload) => ({
  type: CREATE_TEXT_EDITOR_FAILURE,
  payload,
});


export const createTextEditor = (payload) => (dispatch) => {
  dispatch(createTextEditorRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .post(`/textEditor/createTextData`, payload, config)
    .then((response) => {
      dispatch(createTextEditorSuccess(response));
    })
    .catch((err) => {
      dispatch(createTextEditorFailure(err));
    });
};