import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./Dashboard.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getLocalData } from "../../utils/localStorage";
import feamleSticyNotes from "../../images/FemaleStickyNote.jpg";
import NMlogo from "../../images/NM.png";

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
          <Box sx={{ position:"absolute", width: '40%', top:"15vh", paddingLeft:"20px" }}>
            <Box sx={{ fontSize:"52px", textAlign:"left", marginBottom:"30px" }}>
              NoteMaster Pro is your ultimate productivity companion, designed
              to streamline your note-taking and content creation process.
            </Box>
            <Link to="/register" style={{ textDecoration: "none", marginRight:"30px" }}>
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
              style={{ width: "100%", height:"105vh" }}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
