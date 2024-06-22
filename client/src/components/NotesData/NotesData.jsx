import {
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DownloadIcon from "@mui/icons-material/Download";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes, deleteNote } from "../../redux/notes/notesAction";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./NotesData.module.scss";

const NotesData = () => {
  const [page, setPage] = useState(1);
  const limit = 3;
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.notesData);
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

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getAllNotes(page, limit));
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
              <Typography variant="h4"> Notes</Typography>
            </Box>
            <Box sx={{ mb: "50px" }}>
              <Link to="/create-note" style={{ textDecoration: "none" }}>
                <Button variant="contained">Create Note</Button>
              </Link>
            </Box>
            {notesData?.allNotesRequest ? (
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
              notesData &&
              notesData?.notesData?.data?.data.map((item) => {
                return (
                  <Box key={item._id}>
                    <Accordion
                      style={{
                        marginBottom: "15px",
                        padding: "5px",
                        backgroundColor: "#fffad0",
                      }}
                      defaultExpanded
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          {item.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box sx={{ mb: "7px" }}>
                          <Chip
                            label={
                              <b
                                style={{
                                  textTransform: "capitalize",
                                }}
                              >
                                {item.category}
                              </b>
                            }
                            color="success"
                            size="small"
                          />
                        </Box>
                        <Typography>{item.content}</Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          sx={{ mt: "15px" }}
                        >
                          -- Created on : {item.createdAt.substring(0, 10)}
                        </Typography>
                        {item?.anyfile && (
                          <a
                            href={`http://localhost:6800/${item?.anyfile}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button
                              endIcon={<DownloadIcon />}
                              variant="contained"
                            >
                              Download File
                            </Button>
                          </a>
                        )}
                      </AccordionDetails>
                      <Divider />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          ml: "15px",
                          pt: "10px",
                        }}
                      >
                        <Link
                          to={`/edit-note/${item._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            endIcon={<EditIcon />}
                            sx={{ mr: "15px" }}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          size="small"
                          endIcon={<DeleteIcon />}
                          onClick={() => handleDeleteNote(item?._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Accordion>
                  </Box>
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
                disabled={page >= notesData?.notesData?.data?.totalPages}
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

export default NotesData;
