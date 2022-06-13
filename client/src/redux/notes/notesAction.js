import axios from "axios";
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

export const getNotesSuccess = (payload) => ({
  type: GET_NOTES_SUCCESS,
  payload,
});

export const getNotesFailure = (payload) => ({
  type: GET_NOTES_FAILURE,
  payload,
});

export const deleteNotesSuccess = (payload) => ({
  type: DELETE_NOTES_SUCCESS,
  payload,
});

export const createNotesRequest = () => ({
  type: CREATE_NOTES_REQUEST,
});

export const createNotesSuccess = (payload) => ({
  type: CREATE_NOTES_SUCCESS,
  payload,
});

export const createNotesFailure = (payload) => ({
  type: CREATE_NOTES_FAILURE,
  payload,
});

export const editNoteRequest = () => ({
  type: EDIT_NOTE_REQUEST,
});

export const editNoteSuccess = (payload) => ({
  type: EDIT_NOTE_SUCCESS,
  payload,
});

export const editNoteFailure = (payload) => ({
  type: EDIT_NOTE_FAILURE,
  payload,
});

export const getAllNotes = (payload) => (dispatch) => {
  dispatch(getNotesRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .get(`/note/getAllNotes`, config)
    .then((response) => {
      dispatch(getNotesSuccess(response));
    })
    .catch((err) => {
      dispatch(getNotesFailure(err));
    });
};

export const deleteNote = (id) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .delete(`/note/deleteNote/${id}`, config)
    .then((response) => {
      dispatch(deleteNotesSuccess(response));
    });
};

export const createNote = (payload) => (dispatch) => {
  dispatch(createNotesRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .post(`/note/createNote`, payload, config)
    .then((response) => {
      dispatch(createNotesSuccess(response));
    })
    .catch((err) => {
      dispatch(createNotesFailure(err));
    });
};

export const editNote = (id, payload) => (dispatch) => {
  dispatch(editNoteRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .put(`/note/updateNote/${id}`, payload, config)
    .then((response) => {
      dispatch(editNoteSuccess(response));
    })
    .catch((err) => {
      dispatch(editNoteFailure(err));
    });
};
