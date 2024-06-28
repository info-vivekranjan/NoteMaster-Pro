import {
    CREATE_MARKDOWN_EDITOR_REQUEST,
    CREATE_MARKDOWN_EDITOR_SUCCESS,
    CREATE_MARKDOWN_EDITOR_FAILURE,
    GET_MARKDOWN_EDITOR_REQUEST,
    GET_MARKDOWN_EDITOR_SUCCESS,
    GET_MARKDOWN_EDITOR_FAILURE,
    EDIT_MARKDOWN_EDITOR_REQUEST,
    EDIT_MARKDOWN_EDITOR_SUCCESS,
    EDIT_MARKDOWN_EDITOR_FAILURE,
  } from "./markdownEditorActionTypes";
  
  let initialState = {
    createAllMarkdownEditorRequest: false,
    createAllMarkdownEditorSuccess: false,
    createAllMarkdownEditorFailure: false,
    createdMarkdownEditorData: [],
    createdFailureData: "",
    allMarkdownEditorRequest: false,
    allMarkdownEditorSuccess: false,
    allMarkdownEditorFailure: false,
    markdownEditorData: [],
    editAllMarkdownEditorRequest: false,
    editAllMarkdownEditorSuccess: false,
    editAllMarkdownEditorFailure: false,
    editedMarkdownEditorData: [],
    editedFailureData: "",
  };
  
  export const markdownEditorReducer = (state = initialState, { type, payload }: { type: any, payload: any }) => {
    switch (type) {
      case CREATE_MARKDOWN_EDITOR_REQUEST:
        return {
          ...state,
          createAllMarkdownEditorRequest: true,
        };
      case CREATE_MARKDOWN_EDITOR_SUCCESS:
        return {
          ...state,
          createAllMarkdownEditorRequest: false,
          createAllMarkdownEditorSuccess: true,
          createdMarkdownEditorData: payload,
        };
      case CREATE_MARKDOWN_EDITOR_FAILURE:
        return {
          ...state,
          createAllMarkdownEditorRequest: false,
          createAllMarkdownEditorFailure: true,
          createdFailureData: payload,
        };
      case GET_MARKDOWN_EDITOR_REQUEST:
        return {
          ...state,
          allMarkdownEditorRequest: true,
        };
      case GET_MARKDOWN_EDITOR_SUCCESS:
        return {
          ...state,
          allMarkdownEditorRequest: false,
          allMarkdownEditorSuccess: true,
          markdownEditorData: payload,
        };
      case GET_MARKDOWN_EDITOR_FAILURE:
        return {
          ...state,
          allMarkdownEditorRequest: false,
          allMarkdownEditorFailure: true,
          failureData: payload,
        };
      case EDIT_MARKDOWN_EDITOR_REQUEST:
        return {
          ...state,
          editAllMarkdownEditorRequest: true,
        };
      case EDIT_MARKDOWN_EDITOR_SUCCESS:
        return {
          ...state,
          editAllMarkdownEditorRequest: false,
          editAllMarkdownEditorSuccess: true,
          editedMarkdownEditorData: payload,
        };
      case EDIT_MARKDOWN_EDITOR_FAILURE:
        return {
          ...state,
          editAllMarkdownEditorRequest: false,
          editAllMarkdownEditorFailure: true,
          editedFailureData: payload,
        };
      default:
        return state;
    }
  };
  