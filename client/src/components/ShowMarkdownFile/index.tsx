import {
    Box,
    Typography,
    Button,
    Skeleton,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import Container from "@mui/material/Container";
  import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
  import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import { useDispatch, useSelector } from "react-redux";
  import {
    getAllMarkdownEditor,
    deleteMarkdownEditor,
  } from "../../redux/markdownEditor/markdownEditorAction";
  import Navbar from "../Navbar/Navbar";
  import { Link } from "react-router-dom";
  import styles from "./ShowMarkdownFile.module.scss";
  import ShowSingleMarkdownFile from "./ShowSingleMarkdownFile";
  
  const ShowMarkdownFile = () => {
    const [page, setPage] = useState(1);
    const limit = 3;
    const dispatch = useDispatch();
    const markdownEditorData = useSelector((state) => state.markdownEditorData);
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
  
    const handleDeleteMarkdownEditor = (id) => {
      dispatch(deleteMarkdownEditor(id));
      window.location.reload();
    };
  
    useEffect(() => {
      dispatch(getAllMarkdownEditor(page, limit));
    }, [dispatch, page]);
  
    // if (notesData?.failureData?.response?.data.message === "Invalid Token") {
    //   localStorage.clear();
    //   navigate("/login");
    // }
    // console.log(notesData);
    return (
      <React.Fragment>
        <Navbar />
        <Box sx={{ pt: "100px" }}>
          <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ mb: "20px" }}>
              <Box sx={{ mb: "20px" }}>
                <Typography variant="h4">Markdown Files</Typography>
              </Box>
              <Box sx={{ mb: "20px" }}>
                <Link to="/markdown-editor" style={{ textDecoration: "none" }}>
                  <Button variant="contained">Create Markdown File</Button>
                </Link>
              </Box>
              {markdownEditorData?.allMarkdownEditorRequest ? (
                <div
                  style={{
                    padding: "5px",
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    sx={{ width: "100%", marginBottom: "15px" }}
                    height={200}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ width: "100%", marginBottom: "15px" }}
                    height={200}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ width: "100%", marginBottom: "15px" }}
                    height={200}
                  />
                </div>
              ) : (
                markdownEditorData &&
                markdownEditorData?.markdownEditorData?.data?.data.map((item) => {
                  return (
                    <ShowSingleMarkdownFile item={item}  handleDeleteMarkdownEditor={handleDeleteMarkdownEditor} />
                  );
                })
              )}
              <Box className={styles.paginationCont}>
                <Button
                  variant="contained"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  sx={{ mr: "20px" }}
                >
                  <ArrowBackIosIcon />
                </Button>
                <Button
                  variant="contained"
                  disabled={
                    page >= markdownEditorData?.markdownEditorData?.data?.totalPages
                  }
                  onClick={() => setPage(page + 1)}
                >
                  <ArrowForwardIosIcon />
                </Button>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </React.Fragment>
    );
  };
  
  export default ShowMarkdownFile;
  