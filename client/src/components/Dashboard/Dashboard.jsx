import React from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Dashboard = () => {
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
    <Box className={styles.dashboardCont}>
      <ThemeProvider theme={theme}>
        <Box className={styles.headerText}>
          <Typography style={{ fontSize: "3.3rem", marginBottom: "5rem" }}>
            Sometimes it's important to <br /> Take-a-note
          </Typography>
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained" size="large">
                <b>Login</b>
              </Button>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button variant="contained" size="large">
                <b>Register</b>
              </Button>
            </Link>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default Dashboard;
