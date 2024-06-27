import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Navbar/Navbar";
// import styles from "./MarkdownEditor.module.scss";
import MarkdownCodeEditor from "@uiw/react-markdown-editor";
import { code } from "./DemoMarkdownCode";

const MarkdownEditor = () => {
  const [markdownVal, setMarkdownVal] = useState(code);
  console.log("markdownVal:", markdownVal);
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

  return (
    <React.Fragment>
      <Navbar />
      <Box sx={{ pt: "100px" }}>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl" sx={{ mb: "25px" }}>
            <Box sx={{ mb: "25px" }}>
              <Typography variant="h4">Markdown Editor</Typography>
            </Box>
            <Box>
              <MarkdownCodeEditor
                style={{ height: "70vh" }}
                value={markdownVal}
                onChange={(value) => {
                  setMarkdownVal(value);
                }}
              />
              <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: "20px",
                  }}
                >
                  <Button variant="contained" sx={{ mr: "20px" }}>
                    Save Changes
                  </Button>
                  <Button variant="contained" color="black">
                    <Box component="span" color="white">
                      Cancel
                    </Box>
                  </Button>
                </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </React.Fragment>
  );
};

export default MarkdownEditor;
