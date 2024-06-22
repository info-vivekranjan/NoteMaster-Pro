import React, { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Navbar from "../Navbar/Navbar";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createTextEditor } from "../../redux/textEditor/textEditorAction";
import { useDispatch } from "react-redux";


const TextEditor = () => {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const names = [
    "Technical",
    "Social",
    "Creative",
    "Personal Development",
    "Professional",
    "Financial",
    "Travel",
    "Miscellaneous",
    "Others",
  ];

  let theme = createTheme({
    palette: {
      primary: {
        main: "#FCD450",
      },
      secondary: {
        main: "#edf2ff",
      },
      black: {
        main: "#000000",
      },
    },
  });

  var modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "font",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "size",
  ];

  const handleProcedureContentChange = (content) => {
    setEditorState(content);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  
  const handleCreateTextEditor = () =>{
    const payload = {
      title,
      category,
      content: editorState
    }
    dispatch(createTextEditor(payload));
  }

  useEffect(() => {}, []);
  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Box style={{ paddingTop: "100px" }}>
          <Container maxWidth="xxl">
            <Box sx={{ mb: "20px" }}>
              <Typography variant="h4">Text Editor</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "100%", marginRight: "20px" }}>
                <Box style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                  <TextField
                    id="title-basic"
                    label="Title"
                    variant="outlined"
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChangeTitle}
                    style={{ width: "49%" }}
                  />
                  <FormControl style={{ width: "49%" }}>
                    <InputLabel id="category-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="category-simple-select-label"
                      id="category-simple-select"
                      value={category}
                      label="Category"
                      onChange={handleChangeCategory}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  placeholder="write your content ...."
                  onChange={handleProcedureContentChange}
                  style={{ width: "100%", height: "65vh" }}
                ></ReactQuill>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: "50px",
                  }}
                >
                  <Button variant="contained" sx={{ mr: "20px" }} onClick={handleCreateTextEditor}>
                    Save Changes
                  </Button>
                  <Button variant="contained" color="black">
                    <Box component="span" color="white">
                      Cancel
                    </Box>
                  </Button>
                </Box>
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  id="htmltext-basic"
                  label="Html text"
                  variant="outlined"
                  type="text"
                  name="htmltext"
                  value={editorState}
                  multiline
                  disabled
                  rows={29.5}
                  style={{ width: "100%" }}
                />
              </Box>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default TextEditor;
