import {
  CREATE_TEXT_EDITOR_REQUEST,
  CREATE_TEXT_EDITOR_SUCCESS,
  CREATE_TEXT_EDITOR_FAILURE,
  GET_TEXT_EDITOR_REQUEST,
  GET_TEXT_EDITOR_SUCCESS,
  GET_TEXT_EDITOR_FAILURE,
  EDIT_TEXT_EDITOR_REQUEST,
  EDIT_TEXT_EDITOR_SUCCESS,
  EDIT_TEXT_EDITOR_FAILURE,
} from "./textEditorActionTypes";

let initialState = {
  createAllTextEditorRequest: false,
  createAllTextEditorSuccess: false,
  createAllTextEditorFailure: false,
  createdTextEditorData: [],
  createdFailureData: "",
  allTextEditorRequest: false,
  allTextEditorSuccess: false,
  allTextEditorFailure: false,
  textEditorData: [],
  editAllTextEditorRequest: false,
  editAllTextEditorSuccess: false,
  editAllTextEditorFailure: false,
  editedTextEditorData: [],
  editedFailureData: "",
};

export const textEditorReducer = (state = initialState, { type, payload }: { type: any, payload: any }) => {
  switch (type) {
    case CREATE_TEXT_EDITOR_REQUEST:
      return {
        ...state,
        createAllTextEditorRequest: true,
      };
    case CREATE_TEXT_EDITOR_SUCCESS:
      return {
        ...state,
        createAllTextEditorRequest: false,
        createAllTextEditorSuccess: true,
        createdTextEditorData: payload,
      };
    case CREATE_TEXT_EDITOR_FAILURE:
      return {
        ...state,
        createAllTextEditorRequest: false,
        createAllTextEditorFailure: true,
        createdFailureData: payload,
      };
    case GET_TEXT_EDITOR_REQUEST:
      return {
        ...state,
        allTextEditorRequest: true,
      };
    case GET_TEXT_EDITOR_SUCCESS:
      return {
        ...state,
        allTextEditorRequest: false,
        allTextEditorSuccess: true,
        textEditorData: payload,
      };
    case GET_TEXT_EDITOR_FAILURE:
      return {
        ...state,
        allTextEditorRequest: false,
        allTextEditorFailure: true,
        failureData: payload,
      };
    case EDIT_TEXT_EDITOR_REQUEST:
      return {
        ...state,
        editAllTextEditorRequest: true,
      };
    case EDIT_TEXT_EDITOR_SUCCESS:
      return {
        ...state,
        editAllTextEditorRequest: false,
        editAllTextEditorSuccess: true,
        editedTextEditorData: payload,
      };
    case EDIT_TEXT_EDITOR_FAILURE:
      return {
        ...state,
        editAllTextEditorRequest: false,
        editAllTextEditorFailure: true,
        editedFailureData: payload,
      };
    default:
      return state;
  }
};
