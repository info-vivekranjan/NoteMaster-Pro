import React, { useState, useRef } from "react";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createImagePlugin from "@draft-js-plugins/image";
import createLinkPlugin from "@draft-js-plugins/anchor";
import createVideoPlugin from '@draft-js-plugins/video';
import Select from "react-select";
import cn from "classnames";
import { stateToHTML } from "draft-js-export-html";
import styles from "./TextEditor.module.css";
import Navbar from "../Navbar/Navbar";
import { Box, Container, TextField, Typography } from "@mui/material";

const imagePlugin = createImagePlugin();
const linkPlugin = createLinkPlugin();
const videoPlugin = createVideoPlugin();

const headerOptions = [
  { label: "H1", value: "header-one" },
  { label: "H2", value: "header-two" },
  { label: "H3", value: "header-three" },
  { label: "H4", value: "header-four" },
  { label: "H5", value: "header-five" },
  { label: "H6", value: "header-six" },
];

const customStyles = {
  input: (provided) => ({
    ...provided,
    wordBreak: "break-all",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#FFF",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#FFF",
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "25px",
    height: "100%",
    borderRadius: 0,
    backgroundColor: "#68696b",
    borderColor: "transparent",
    color: "#FFF",
    outline: "none",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    marginTop: "0",
    marginBottom: "0",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "4px",
  }),
};

const RenderDraftTinyMce = (props) => {
  const { maxLength } = props;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);
  const plugins = [imagePlugin, linkPlugin, videoPlugin];

  const getLengthOfSelectedText = () => {
    const currentSelection = editorState.getSelection();
    const isCollapsed = currentSelection.isCollapsed();

    let length = 0;

    if (!isCollapsed) {
      const currentContent = editorState.getCurrentContent();
      const startKey = currentSelection.getStartKey();
      const endKey = currentSelection.getEndKey();
      const startBlock = currentContent.getBlockForKey(startKey);
      const isStartAndEndBlockAreTheSame = startKey === endKey;
      const startBlockTextLength = startBlock.getLength();
      const startSelectedTextLength =
        startBlockTextLength - currentSelection.getStartOffset();
      const endSelectedTextLength = currentSelection.getEndOffset();
      const keyAfterEnd = currentContent.getKeyAfter(endKey);

      if (isStartAndEndBlockAreTheSame) {
        length +=
          currentSelection.getEndOffset() - currentSelection.getStartOffset();
      } else {
        let currentKey = startKey;

        while (currentKey && currentKey !== keyAfterEnd) {
          if (currentKey === startKey) {
            length += startSelectedTextLength + 1;
          } else if (currentKey === endKey) {
            length += endSelectedTextLength;
          } else {
            length += currentContent.getBlockForKey(currentKey).getLength() + 1;
          }

          currentKey = currentContent.getKeyAfter(currentKey);
        }
      }
    }

    return length;
  };

  const handleBeforeInput = () => {
    if (maxLength && editorState) {
      const currentContent = editorState.getCurrentContent();
      const currentContentLength = currentContent.getPlainText("").length;
      const selectedTextLength = getLengthOfSelectedText();

      if (currentContentLength - selectedTextLength > maxLength - 1) {
        return "handled";
      }
    }
    return "";
  };

  const handlePastedText = (pastedText) => {
    if (maxLength && editorState) {
      const currentContent = editorState.getCurrentContent();
      const currentContentLength = currentContent.getPlainText("").length;
      const selectedTextLength = getLengthOfSelectedText();

      if (
        currentContentLength + pastedText.length - selectedTextLength >
        maxLength
      ) {
        return "handled";
      }
    }
    return "";
  };

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
    // onChangeEditorValue(newEditorState);
  };

  const onAddLink = () => {
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link -");
    if (!link) {
      onChange(RichUtils.toggleLink(editorState, selection, null));
      return "handled";
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link,
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return "handled";
  };

  const onAddImage = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    const urlValue = window.prompt("Paste Image Link");
    if (!urlValue) {
      onChange(RichUtils.toggleLink(editorState, selection, null));
      return "handled";
    }
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
    // onChangeEditorValue(newEditorState);
    return "handled";
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style) => {
    onChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleHeaderBlockType = (type) => {
    onChange(RichUtils.toggleBlockType(editorState, type.value));
  };

  const toggleBlockType = (type) => {
    onChange(RichUtils.toggleBlockType(editorState, type));
  };
  const description = stateToHTML(editorState?.getCurrentContent(), {});

  console.log(description);

  return (
    <>
      <Navbar />
      <Box style={{ paddingTop: "100px" }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: "50px" }}>
            <Typography variant="h4">Text Editor</Typography>
          </Box>
          <Box
            className={cn(styles.draftHead)}
            style={{
              backgroundColor: "gray",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Box className={cn(styles.borderRight)} style={{ display: "flex" }}>
              <Select
                options={headerOptions}
                className={cn(styles.selectHeaderBox)}
                onChange={toggleHeaderBlockType}
                placeholder="H1"
                styles={customStyles}
                id="header-one"
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => (
                    <span className="fa fa-caret-down mr-10" />
                  ),
                }}
              />
            </Box>
            <Box
              className={cn(styles.borderLeft, styles.borderRight)}
              style={{ display: "flex" }}
            >
              <button
                type="button"
                onClick={() => toggleInlineStyle("BOLD")}
                className={cn(styles.toolbutton)}
              >
                <b>B</b>
              </button>
              <button
                type="button"
                onClick={() => toggleInlineStyle("ITALIC")}
                className={cn(styles.toolbutton)}
              >
                <em>I</em>
              </button>
              <button
                type="button"
                onClick={() => toggleInlineStyle("UNDERLINE")}
                className={cn(
                  styles.textDecorationUnderline,
                  styles.toolbutton
                )}
              >
                U
              </button>
            </Box>
            <Box
              className={cn(styles.borderLeft, styles.borderRight)}
              style={{ display: "flex" }}
            >
              <button
                type="button"
                onClick={() => toggleBlockType("unordered-list-item")}
                className={cn(styles.toolbutton)}
              >
                List
              </button>
            </Box>
            <Box
              className={cn(styles.borderLeft, styles.borderRight)}
              style={{ display: "flex" }}
            >
              <button
                type="button"
                onClick={onAddImage}
                className={cn(styles.toolbutton)}
              >
                Img
              </button>
            </Box>
            <Box
              className={cn(styles.borderLeft, styles.borderRight)}
              style={{ display: "flex" }}
            >
              <button
                type="button"
                onClick={onAddLink}
                className={cn(styles.toolbutton)}
              >
                Link
              </button>
            </Box>
          </Box>
          <Box
            role="button"
            tabIndex="0"
            className={cn(styles.textAreaContainer)}
          >
            <Editor
              editorState={editorState}
              onChange={onChange}
              ref={editorRef}
              handleBeforeInput={handleBeforeInput}
              handleKeyCommand={handleKeyCommand}
              handlePastedText={handlePastedText}
              plugins={plugins}
            />
          </Box>
          <Box sx={{ mt: "50px" }}>
            <TextField
              id="htmltext-basic"
              label="Html text"
              variant="outlined"
              type="text"
              name="htmltext"
              value={description}
              multiline
              rows={10}
              style={{ width: "85%" }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default RenderDraftTinyMce;
