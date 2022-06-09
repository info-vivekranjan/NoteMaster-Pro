import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../redux/auth/authAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handelLogin = () => {
    dispatch(authLogin({ email: "vivek0003@hotmail.com", password: "1234" }));
  };
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
  console.log(auth);
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box>
          <Typography variant="h2">Login</Typography>
          <Button variant="contained" onClick={handelLogin}>
            <b>Login</b>
          </Button>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default Login;
