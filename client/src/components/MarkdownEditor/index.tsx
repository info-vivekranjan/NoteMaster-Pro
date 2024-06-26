import { Box, Typography } from "@mui/material";
import React from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Navbar/Navbar";
// import styles from "./MarkdownEditor.module.scss";

const MarkdownEditor = () => {
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

  return (
    <React.Fragment>
      <Navbar />
      <Box sx={{ pt: "100px" }}>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg" sx={{ mb: "50px" }}>
            <Box sx={{ mb: "50px" }}>
              <Typography variant="h4">Markdown Editor</Typography>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </React.Fragment>
  );
};

export default MarkdownEditor;
