import axios, { AxiosResponse } from "axios";
import { getLocalData } from "../../utils/localStorage";
import {
  CREATE_TEXT_EDITOR_REQUEST,
  CREATE_TEXT_EDITOR_SUCCESS,
  CREATE_TEXT_EDITOR_FAILURE,
  GET_TEXT_EDITOR_REQUEST,
  GET_TEXT_EDITOR_SUCCESS,
  GET_TEXT_EDITOR_FAILURE,
  DELETE_TEXT_EDITOR_SUCCESS,
  EDIT_TEXT_EDITOR_REQUEST,
  EDIT_TEXT_EDITOR_SUCCESS,
  EDIT_TEXT_EDITOR_FAILURE,
} from "./textEditorActionTypes";

export const createTextEditorRequest = () => ({
  type: CREATE_TEXT_EDITOR_REQUEST,
});

export const createTextEditorSuccess = (payload: AxiosResponse<any, any>) => ({
  type: CREATE_TEXT_EDITOR_SUCCESS,
  payload,
});

export const createTextEditorFailure = (payload: any) => ({
  type: CREATE_TEXT_EDITOR_FAILURE,
  payload,
});

export const getTextEditorRequest = () => ({
  type: GET_TEXT_EDITOR_REQUEST,
});

export const getTextEditorSuccess = (payload: AxiosResponse<any, any>) => ({
  type: GET_TEXT_EDITOR_SUCCESS,
  payload,
});

export const getTextEditorFailure = (payload: any) => ({
  type: GET_TEXT_EDITOR_FAILURE,
  payload,
});

export const deleteTextEditorSuccess = (payload: AxiosResponse<any, any>) => ({
  type: DELETE_TEXT_EDITOR_SUCCESS,
  payload,
});

export const editTextEditorRequest = () => ({
  type: EDIT_TEXT_EDITOR_REQUEST,
});

export const editTextEditorSuccess = (payload: AxiosResponse<any, any>) => ({
  type: EDIT_TEXT_EDITOR_SUCCESS,
  payload,
});

export const editTextEditorFailure = (payload: any) => ({
  type: EDIT_TEXT_EDITOR_FAILURE,
  payload,
});

export const getAllTextEditor = (page: number, limit: number) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  dispatch(getTextEditorRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .get(`/textEditor/getAllTextData?page=${page}&limit=${limit}`, config)
    .then((response: any) => {
      dispatch(getTextEditorSuccess(response));
    })
    .catch((err: any) => {
      dispatch(getTextEditorFailure(err));
    });
};

export const createTextEditor = (payload: { title: string; category: string; content: string; }) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  dispatch(createTextEditorRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .post(`/textEditor/createTextData`, payload, config)
    .then((response: any) => {
      dispatch(createTextEditorSuccess(response));
    })
    .catch((err: any) => {
      dispatch(createTextEditorFailure(err));
    });
};

export const deleteTextEditor = (id: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .delete(`/textEditor/deleteTextData/${id}`, config)
    .then((response: any) => {
      dispatch(deleteTextEditorSuccess(response));
    });
};

export const editTextEditor = (id: string | undefined, payload: { title: string; category: string; content: string; }) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  dispatch(editTextEditorRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .put(`/textEditor/updateTextData/${id}`, payload, config)
    .then((response: any) => {
      dispatch(editTextEditorSuccess(response));
    })
    .catch((err: any) => {
      dispatch(editTextEditorFailure(err));
    });
};
