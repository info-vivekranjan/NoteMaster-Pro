import axios from "axios";
import { getLocalData } from "../../utils/localStorage";
import {
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
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
