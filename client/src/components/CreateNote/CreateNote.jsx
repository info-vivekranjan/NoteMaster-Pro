import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../redux/notes/notesAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import styles from "./CreateNote.module.css";
import Navbar from "../Navbar/Navbar";

const CreateNote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createdNoteData = useSelector((state) => state.createdNoteData);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
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

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleCreateNote = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("file", file);

    dispatch(createNote(formData));
    navigate("/notes");
  };
  let theme = createTheme({
    palette: {
      primary: {
        main: "#FCD450",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
  });

  // console.log(createdNoteData);
  return (
    <>
      <Navbar />
      <Box className={styles.registerCont}>
        <ThemeProvider theme={theme}>
          <Box className={styles.registerSubCont}>
            <Typography variant="h3">Create Note</Typography>
            <br />
            <br />
            <br />
            <TextField
              id="title-basic"
              label="Title"
              variant="outlined"
              type="text"
              name="title"
              value={title}
              onChange={handleChangeTitle}
              style={{ width: "60%" }}
            />
            <br />
            <br />
            <TextField
              id="content-basic"
              label="Content"
              variant="outlined"
              type="text"
              name="content"
              value={content}
              multiline
              rows={3}
              onChange={handleChangeContent}
              style={{ width: "60%" }}
            />
            <br />
            <br />
            <FormControl style={{ width: "60%" }}>
              <InputLabel id="category-simple-select-label">Category</InputLabel>
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
            {/* <TextField
              id="category-basic"
              label="Category"
              variant="outlined"
              type="text"
              name="category"
              value={category}
              onChange={handleChangeCategory}
              style={{ width: "60%" }}
            /> */}
            <br />
            <br />
            <Box>
              <input
                type="file"
                id="anyfile"
                name="anyfile"
                onChange={handleChangeFile}
                style={{ display: "none" }}
              />
              <label htmlFor="anyfile">
                <Button
                  startIcon={<FileUploadIcon />}
                  variant="contained"
                  style={{ width: "60%" }}
                  component="span"
                >
                  Upload File
                </Button>
              </label>
            </Box>
            <br />
            <br />
            <Button
              variant="contained"
              onClick={handleCreateNote}
              style={{ width: "60%" }}
            >
              <b>Create note</b>
            </Button>
          </Box>
        </ThemeProvider>
      </Box>
    </>
  );
};

export default CreateNote;
