import React, { useEffect, useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editNote } from "../../redux/notes/notesAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditNote.module.css";
import Navbar from "../Navbar/Navbar";
import { getLocalData } from "../../utils/localStorage";
import axios from "axios";

const EditNote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editedNoteData = useSelector((state) => state.notesData.editedNoteData);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { id } = useParams();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleEditNote = () => {
    const payload = { title, content, category };
    dispatch(editNote(id, payload));
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

  useEffect(() => {
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-access-token": getLocalData("userInfo")?.token,
      },
    };

    const fetchSingleData = () => {
      return axios
        .get(`/note/getSingleNote/${id}`, config)
        .then((res) => {
          console.log("res==", res);
          setTitle(res?.data?.data?.title);
          setContent(res?.data?.data?.content);
          setCategory(res?.data?.data?.category);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchSingleData();
  }, [id]);

  console.log("singleNoteData", { title, content, category });
  return (
    <>
      <Navbar />
      <Box className={styles.registerCont}>
        <ThemeProvider theme={theme}>
          <Box className={styles.registerSubCont}>
            <Typography variant="h3">Edit Note</Typography>
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
            <TextField
              id="category-basic"
              label="Category"
              variant="outlined"
              type="text"
              name="category"
              value={category}
              onChange={handleChangeCategory}
              style={{ width: "60%" }}
            />
            <br />
            <br />
            <Button
              variant="contained"
              onClick={handleEditNote}
              style={{ width: "60%" }}
            >
              <b>Save</b>
            </Button>
          </Box>
        </ThemeProvider>
      </Box>
    </>
  );
};

export default EditNote;
