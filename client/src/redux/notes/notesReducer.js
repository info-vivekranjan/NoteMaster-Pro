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

let initialState = {
  allNotesRequest: false,
  allNotesSuccess: false,
  allNotesFailure: false,
  notesData: [],
  deletedNote: [],
  failureData: "",
  createAllNotesRequest: false,
  createAllNotesSuccess: false,
  createAllNotesFailure: false,
  createdNoteData: [],
  createdFailureData: "",
  editAllNoteRequest: false,
  editAllNoteSuccess: false,
  editAllNoteFailure: false,
  editedNoteData: [],
  editedFailureData: "",
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
    case CREATE_NOTES_REQUEST:
      return {
        ...state,
        createAllNotesRequest: true,
      };
    case CREATE_NOTES_SUCCESS:
      return {
        ...state,
        createAllNotesRequest: false,
        createAllNotesSuccess: true,
        createdNoteData: payload,
      };
    case CREATE_NOTES_FAILURE:
      return {
        ...state,
        createAllNotesRequest: false,
        createAllNotesFailure: true,
        createdFailureData: payload,
      };
    case EDIT_NOTE_REQUEST:
      return {
        ...state,
        editAllNoteRequest: true,
      };
    case EDIT_NOTE_SUCCESS:
      return {
        ...state,
        editAllNoteRequest: false,
        editAllNoteSuccess: true,
        editedNoteData: payload,
      };
    case EDIT_NOTE_FAILURE:
      return {
        ...state,
        editAllNoteRequest: false,
        editAllNoteFailure: true,
        editedFailureData: payload,
      };
    default:
      return state;
  }
};
