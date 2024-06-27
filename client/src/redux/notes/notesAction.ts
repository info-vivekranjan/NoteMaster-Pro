import axios, { AxiosResponse } from "axios";
import { getLocalData } from "../../utils/localStorage";
import {
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
  DELETE_NOTES_SUCCESS,
  CREATE_NOTES_REQUEST,
  CREATE_NOTES_SUCCESS,
  CREATE_NOTES_FAILURE,
  EDIT_NOTE_REQUEST,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_FAILURE,
} from "./notesActionTypes";

export const getNotesRequest = () => ({
  type: GET_NOTES_REQUEST,
});

export const getNotesSuccess = (payload: AxiosResponse<any, any>) => ({
  type: GET_NOTES_SUCCESS,
  payload,
});

export const getNotesFailure = (payload: any) => ({
  type: GET_NOTES_FAILURE,
  payload,
});

export const deleteNotesSuccess = (payload: AxiosResponse<any, any>) => ({
  type: DELETE_NOTES_SUCCESS,
  payload,
});

export const createNotesRequest = () => ({
  type: CREATE_NOTES_REQUEST,
});

export const createNotesSuccess = (payload: AxiosResponse<any, any>) => ({
  type: CREATE_NOTES_SUCCESS,
  payload,
});

export const createNotesFailure = (payload: any) => ({
  type: CREATE_NOTES_FAILURE,
  payload,
});

export const editNoteRequest = () => ({
  type: EDIT_NOTE_REQUEST,
});

export const editNoteSuccess = (payload: AxiosResponse<any, any>) => ({
  type: EDIT_NOTE_SUCCESS,
  payload,
});

export const editNoteFailure = (payload: any) => ({
  type: EDIT_NOTE_FAILURE,
  payload,
});

export const getAllNotes = (page: number, limit: number) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  dispatch(getNotesRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .get(`/note/getAllNotes?page=${page}&limit=${limit}`, config)
    .then((response: any) => {
      dispatch(getNotesSuccess(response));
    })
    .catch((err: any) => {
      dispatch(getNotesFailure(err));
    });
};

export const deleteNote = (id: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .delete(`/note/deleteNote/${id}`, config)
    .then((response: any) => {
      dispatch(deleteNotesSuccess(response));
    });
};

export const createNote = (payload: FormData) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  dispatch(createNotesRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .post(`/note/createNote`, payload, config)
    .then((response: any) => {
      dispatch(createNotesSuccess(response));
    })
    .catch((err: any) => {
      dispatch(createNotesFailure(err));
    });
};

export const editNote = (id: string | undefined, payload: FormData) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  dispatch(editNoteRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .put(`/note/updateNote/${id}`, payload, config)
    .then((response: any) => {
      dispatch(editNoteSuccess(response));
    })
    .catch((err: any) => {
      dispatch(editNoteFailure(err));
    });
};
