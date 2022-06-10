import axios from "axios";
import { getLocalData } from "../../utils/localStorage";
import {
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
  DELETE_NOTES_SUCCESS,
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

export const getAllNotes = (payload) => (dispatch) => {
  dispatch(getNotesRequest());

  const config = {
    headers: {
      "Content-type": "application/json",
      "x-access-token": getLocalData("userInfo")?.token,
    },
  };

  return axios
    .get("http://localhost:6800/note/getAllNotes", config)
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
    .delete(`http://localhost:6800/note/deleteNote/${id}`, config)
    .then((response) => {
      dispatch(deleteNotesSuccess(response));
    });
};
