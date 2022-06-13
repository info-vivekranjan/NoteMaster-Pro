import React, {useEffect} from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./Dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {getLocalData} from '../../utils/localStorage';

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
    <Box className={styles.dashboardCont}>
      <ThemeProvider theme={theme}>
        <Box className={styles.headerText}>
          <Typography style={{ fontSize: "3.3rem", marginBottom: "5rem" }}>
            Sometimes it's important to <br /> Make notes
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
