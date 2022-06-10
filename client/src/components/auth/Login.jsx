import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../redux/auth/authAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import styles from "./Login.module.css";
import { getLocalData } from "../../utils/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handelLogin = () => {
    dispatch(authLogin({ email, password }));
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

  useEffect(() => {
    if (getLocalData("userInfo")?.token?.length > 0) {
      navigate("/notes");
    }
  }, [getLocalData("userInfo")?.token]);

  return (
    <Box className={styles.loginCont}>
      <ThemeProvider theme={theme}>
        <Box className={styles.loginSubCont}>
          <Typography variant="h3">Login</Typography>
          <br />
          <br />
          <br />
          <TextField
            id="email-basic"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            style={{ width: "60%" }}
          />
          <br />
          <br />
          <FormControl variant="outlined" style={{ width: "60%" }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <br />
          <br />
          <Button
            variant="contained"
            onClick={handelLogin}
            style={{ width: "60%" }}
          >
            <b>Login</b>
          </Button>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default Login;
