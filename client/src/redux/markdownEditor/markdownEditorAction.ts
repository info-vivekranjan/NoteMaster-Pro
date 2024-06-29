import axios, { AxiosResponse } from "axios";
import { getLocalData } from "../../utils/localStorage";
import {
  CREATE_MARKDOWN_EDITOR_REQUEST,
  CREATE_MARKDOWN_EDITOR_SUCCESS,
  CREATE_MARKDOWN_EDITOR_FAILURE,
  GET_MARKDOWN_EDITOR_REQUEST,
  GET_MARKDOWN_EDITOR_SUCCESS,
  GET_MARKDOWN_EDITOR_FAILURE,
  DELETE_MARKDOWN_EDITOR_SUCCESS,
  EDIT_MARKDOWN_EDITOR_REQUEST,
  EDIT_MARKDOWN_EDITOR_SUCCESS,
  EDIT_MARKDOWN_EDITOR_FAILURE,
} from "./markdownEditorActionTypes";

export const createMarkdownEditorRequest = () => ({
  type: CREATE_MARKDOWN_EDITOR_REQUEST,
});

export const createMarkdownEditorSuccess = (payload: AxiosResponse<any, any>) => ({
  type: CREATE_MARKDOWN_EDITOR_SUCCESS,
  payload,
});

export const createMarkdownEditorFailure = (payload: any) => ({
  type: CREATE_MARKDOWN_EDITOR_FAILURE,
  payload,
});

export const getMarkdownEditorRequest = () => ({
  type: GET_MARKDOWN_EDITOR_REQUEST,
});

export const getMarkdownEditorSuccess = (payload: AxiosResponse<any, any>) => ({
  type: GET_MARKDOWN_EDITOR_SUCCESS,
  payload,
});

export const getMarkdownEditorFailure = (payload: any) => ({
  type: GET_MARKDOWN_EDITOR_FAILURE,
  payload,
});

export const deleteMarkdownEditorSuccess = (payload: AxiosResponse<any, any>) => ({
  type: DELETE_MARKDOWN_EDITOR_SUCCESS,
  payload,
});

export const editMarkdownEditorRequest = () => ({
  type: EDIT_MARKDOWN_EDITOR_REQUEST,
});

export const editMarkdownEditorSuccess = (payload: AxiosResponse<any, any>) => ({
  type: EDIT_MARKDOWN_EDITOR_SUCCESS,
  payload,
});

export const editMarkdownEditorFailure = (payload: any) => ({
  type: EDIT_MARKDOWN_EDITOR_FAILURE,
  payload,
});

export const getAllMarkdownEditor = (page: number, limit: number) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  dispatch(getMarkdownEditorRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .get(`/markdownEditor/getAllMarkdownData?page=${page}&limit=${limit}`, config)
    .then((response: any) => {
      dispatch(getMarkdownEditorSuccess(response));
    })
    .catch((err: any) => {
      dispatch(getMarkdownEditorFailure(err));
    });
};

export const createMarkdownEditor = (payload: { title: string; category: string; content: string; }) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  dispatch(createMarkdownEditorRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .post(`/markdownEditor/createMarkdownData`, payload, config)
    .then((response: any) => {
      dispatch(createMarkdownEditorSuccess(response));
    })
    .catch((err: any) => {
      dispatch(createMarkdownEditorFailure(err));
    });
};

export const deleteMarkdownEditor = (id: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .delete(`/markdownEditor/deleteMarkdownData/${id}`, config)
    .then((response: any) => {
      dispatch(deleteMarkdownEditorSuccess(response));
    });
};

export const editMarkdownEditor = (id: string | undefined, payload: { title: string; category: string; content: string; }) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  dispatch(editMarkdownEditorRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .put(`/markdownEditor/updateMarkdownData/${id}`, payload, config)
    .then((response: any) => {
      dispatch(editMarkdownEditorSuccess(response));
    })
    .catch((err: any) => {
      dispatch(editMarkdownEditorFailure(err));
    });
};
