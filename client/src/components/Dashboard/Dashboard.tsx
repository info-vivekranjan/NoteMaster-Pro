import { useEffect } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import styles from "./Dashboard.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getLocalData } from "../../utils/localStorage";
import feamleSticyNotes from "../../images/FemaleStickyNote.jpg";
import NMlogo from "../../images/NM.png";
import notes from "../../images/notes.png";
import para from "../../images/para.png";
import textEditor from "../../images/textEditor.png";
import markdown from "../../images/markdown.png";
import markdownEditor from "../../images/markdownEditor.png";

const Dashboard = () => {
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
  useEffect(() => {
    if (getLocalData("userInfo")?.token?.length > 0) {
      navigate("/notes");
    }
  }, [getLocalData("userInfo")?.token]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ position: "relative" }}>
          <nav
            style={{
              width: "96%",
              height: "80px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              padding: "0% 2%",
            }}
          >
            <Box>
              <img src={NMlogo} alt="Logo" style={{ width: "80px" }} />
            </Box>
            <Box
              sx={{
                minWidth: "500px",
                fontSize: "13px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>Note Maker</Box>
              <Box>Text Editor</Box>
              <Box>Markdown Editor</Box>
              <Box>About</Box>
              <Box>Conntact US</Box>
            </Box>
          </nav>
          <Box
            sx={{
              position: "absolute",
              width: "40%",
              top: "15vh",
              paddingLeft: "20px",
            }}
          >
            <Box
              sx={{ fontSize: "52px", textAlign: "left", marginBottom: "30px" }}
            >
              NoteMaster Pro is your ultimate productivity companion, designed
              to streamline your note-taking and content creation process.
            </Box>
            <Link
              to="/register"
              style={{ textDecoration: "none", marginRight: "30px" }}
            >
              <Button variant="contained" size="large">
                <b>Join US</b>
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained" size="large">
                <b>Login</b>
              </Button>
            </Link>
          </Box>
          <Box>
            <img
              src={feamleSticyNotes}
              alt="feamleSticyNotes"
              style={{ width: "100%", height: "105vh" }}
            />
          </Box>
          <Box>
            <Container
              maxWidth="xl"
              style={{ marginTop: "100px", marginBottom: "100px" }}
            >
              <Box
                sx={{
                  fontSize: "40px",
                  borderBottom: "5px solid #FCD450",
                  borderRight: "5px solid #FCD450",
                  width: "250px",
                }}
              >
                Note Maker
              </Box>
              <Box sx={{ fontSize: "24px", marginTop: "15px" }}>
                Easily create and organize your notes with a user-friendly
                interface. Upload files of all formats, including images, PDFs,
                and videos, to keep everything you need in one place.
              </Box>
              <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                <img
                  src={notes}
                  alt="notes"
                  style={{
                    width: "70%",
                    border: "1px solid silver",
                    borderRadius: "5px",
                  }}
                />
              </Box>
            </Container>
          </Box>
          <Divider />
          <Box>
            <Container
              maxWidth="xl"
              style={{ marginTop: "50px", marginBottom: "100px" }}
            >
              <Box
                sx={{
                  fontSize: "40px",
                  borderBottom: "5px solid #FCD450",
                  borderRight: "5px solid #FCD450",
                  width: "250px",
                }}
              >
                Text Editor
              </Box>
              <Box sx={{ fontSize: "24px", marginTop: "15px" }}>
                Enjoy a robust text editor that supports rich text formatting,
                image insertion, and PDF download capabilities, making document
                creation and sharing effortless.
              </Box>
              <Box
                sx={{ display: "flex", textAlign: "center", marginTop: "20px" }}
              >
                <img
                  src={para}
                  alt="para"
                  style={{
                    width: "50%",
                    border: "1px solid silver",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <img
                  src={textEditor}
                  alt="textEditor"
                  style={{
                    width: "50%",
                    border: "1px solid silver",
                    borderRadius: "5px",
                    marginLeft: "10px",
                  }}
                />
              </Box>
            </Container>
          </Box>
          <Divider />
          <Box>
            <Container
              maxWidth="xl"
              style={{ marginTop: "50px", paddingBottom: "200px" }}
            >
              <Box
                sx={{
                  fontSize: "40px",
                  borderBottom: "5px solid #FCD450",
                  borderRight: "5px solid #FCD450",
                  width: "350px",
                }}
              >
                Markdown Editor
              </Box>
              <Box sx={{ fontSize: "24px", marginTop: "15px" }}>
                Leverage the full power of markdown with a live preview feature.
                Edit, preview, and download your markdown files with ease,
                ensuring your documents are always in top form.
              </Box>
              <Box
                sx={{ display: "flex", textAlign: "center", marginTop: "20px" }}
              >
                <img
                  src={markdown}
                  alt="markdown"
                  style={{
                    width: "50%",
                    border: "1px solid silver",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <img
                  src={markdownEditor}
                  alt="markdownEditor"
                  style={{
                    width: "50%",
                    border: "1px solid silver",
                    borderRadius: "5px",
                    marginLeft: "10px",
                  }}
                />
              </Box>
            </Container>
          </Box>
          <Box
            component="footer"
            style={{
              width: "100%",
              minHeight: "100px",
              position: "absolute",
              bottom: "0px",
              backgroundColor: "#FCD450",
            }}
          ></Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
