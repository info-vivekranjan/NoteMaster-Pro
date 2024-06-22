import {
    CREATE_TEXT_EDITOR_REQUEST,
    CREATE_TEXT_EDITOR_SUCCESS,
    CREATE_TEXT_EDITOR_FAILURE,
  } from "./textEditorActionTypes";
  
  let initialState = {
    createAllTextEditorRequest: false,
    createAllTextEditorSuccess: false,
    createAllTextEditorFailure: false,
    createdTextEditorData: [],
    createdFailureData: "",
  };
  
  export const textEditorReducer = (state = initialState, { type, payload }) => {
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
          createdNoteData: payload,
        };
      case CREATE_TEXT_EDITOR_FAILURE:
        return {
          ...state,
          createAllTextEditorRequest: false,
          createAllTextEditorFailure: true,
          createdFailureData: payload,
        };
      default:
        return state;
    }
  };
  