import {
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
  DELETE_NOTES_SUCCESS,
} from "./notesActionTypes";

let initialState = {
  allNotesRequest: false,
  allNotesSuccess: false,
  allNotesFailure: false,
  notesData: [],
  deletedNote: [],
  failureData: "",
};

export const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NOTES_REQUEST:
      return {
        ...state,
        allNotesRequest: true,
      };
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        allNotesRequest: false,
        allNotesSuccess: true,
        notesData: payload,
      };
    case GET_NOTES_FAILURE:
      return {
        ...state,
        allNotesRequest: false,
        allNotesFailure: true,
        failureData: payload,
      };
    case DELETE_NOTES_SUCCESS:
      return {
        ...state,
        deletedNote: payload,
      };
    default:
      return state;
  }
};
