import axios from "axios";
import { getLocalData } from "../../utils/localStorage";
import {
  CREATE_TEXT_EDITOR_REQUEST,
  CREATE_TEXT_EDITOR_SUCCESS,
  CREATE_TEXT_EDITOR_FAILURE,
  GET_TEXT_EDITOR_REQUEST,
  GET_TEXT_EDITOR_SUCCESS,
  GET_TEXT_EDITOR_FAILURE,
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

export const getTextEditorRequest = () => ({
  type: GET_TEXT_EDITOR_REQUEST,
});

export const getTextEditorSuccess = (payload) => ({
  type: GET_TEXT_EDITOR_SUCCESS,
  payload,
});

export const getTextEditorFailure = (payload) => ({
  type: GET_TEXT_EDITOR_FAILURE,
  payload,
});

export const getAllTextEditor = (page, limit) => (dispatch) => {
  dispatch(getTextEditorRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .get(`/textEditor/getAllTextData?page=${page}&limit=${limit}`, config)
    .then((response) => {
      dispatch(getTextEditorSuccess(response));
    })
    .catch((err) => {
      dispatch(getTextEditorFailure(err));
    });
};

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
