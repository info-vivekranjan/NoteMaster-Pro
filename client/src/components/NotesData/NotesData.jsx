import { Box, Typography, Button, Divider, Chip } from "@mui/material";
import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes, deleteNote } from "../../redux/notes/notesAction";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

const NotesData = () => {
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.notesData);
  const navigate = useNavigate();

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
    dispatch(getAllNotes());
  }, [dispatch]);

  // if (notesData?.failureData?.response?.data.message === "Invalid Token") {
  //   localStorage.clear();
  //   navigate("/login");
  // }
  console.log(notesData?.failureData?.response?.data.message);
  return (
    <React.Fragment>
      <Navbar />
      <Box sx={{ pt: "100px" }}>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <Box sx={{ mb: "50px" }}>
              <Typography variant="h4"> Notes</Typography>
            </Box>
            <Box sx={{ mb: "50px" }}>
              <Link to="/create-note" style={{ textDecoration: "none" }}>
                <Button variant="contained">Create Note</Button>
              </Link>
            </Box>
            {notesData &&
              notesData?.notesData?.data?.data.map((item) => {
                return (
                  <Box key={item._id}>
                    <Accordion
                      style={{
                        marginBottom: "15px",
                        padding: "5px",
                        backgroundColor: "#fffad0",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{item.title}</Typography>
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
                      </AccordionDetails>
                      <Divider />
                      <Box sx={{ ml: "15px", pt: "10px" }}>
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
              })}
          </Container>
        </ThemeProvider>
      </Box>
    </React.Fragment>
  );
};

export default NotesData;
