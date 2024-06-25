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
  getAllTextEditor,
  deleteTextEditor,
} from "../../redux/textEditor/textEditorAction";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./ShowTextEditor.module.scss";
import ShowSingleTextEditor from "./ShowSingleTextEditor";

const ShowTextEditor = () => {
  const [page, setPage] = useState(1);
  const limit = 3;
  const dispatch = useDispatch();
  const textEditorData = useSelector((state) => state.textEditorData);
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

  const handleDeleteTextEditor = (id) => {
    dispatch(deleteTextEditor(id));
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getAllTextEditor(page, limit));
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
          <Container maxWidth="lg" sx={{ mb: "50px" }}>
            <Box sx={{ mb: "50px" }}>
              <Typography variant="h4">ParaGraphix</Typography>
            </Box>
            <Box sx={{ mb: "50px" }}>
              <Link to="/create-paragraphix" style={{ textDecoration: "none" }}>
                <Button variant="contained">Create ParaGraphix</Button>
              </Link>
            </Box>
            {textEditorData?.allTextEditorRequest ? (
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
              textEditorData &&
              textEditorData?.textEditorData?.data?.data.map((item) => {
                return (
                  <ShowSingleTextEditor item={item}  handleDeleteTextEditor={handleDeleteTextEditor} />
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
                  page >= textEditorData?.textEditorData?.data?.totalPages
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

export default ShowTextEditor;
