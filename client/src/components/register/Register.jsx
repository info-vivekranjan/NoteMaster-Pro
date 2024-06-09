import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../../redux/register/registerAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import styles from "./Register.module.css";
import profile_icon from "../../images/avatar_icon.png";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerData = useSelector((state) => state.authRegister);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

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

  const handleChangeProfile = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };

  const handleRegister = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file", profile);

    console.log(formData);

    dispatch(authRegister(formData));
    navigate("/login");
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
  console.log(profile);
  return (
    <Box className={styles.registerCont}>
      <ThemeProvider theme={theme}>
        <Box className={styles.registerSubCont}>
          <Typography variant="h3">Register</Typography>
          <br />
          <br />
          <br />
          <Box>
            <label for="img">
              {imageURL ? (
                <img
                  src={imageURL}
                  alt="Profile"
                  style={{ width: "20%", borderRadius: "50%" }}
                />
              ) : (
                <img
                  src={profile_icon}
                  alt="Profile"
                  style={{ width: "20%", borderRadius: "50%" }}
                />
              )}
            </label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleChangeProfile}
              style={{ display: "none" }}
            />
          </Box>
          <br />
          <TextField
            id="name-basic"
            label="Name"
            variant="outlined"
            type="text"
            name="name"
            value={name}
            onChange={handleChangeName}
            style={{ width: "60%" }}
          />
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
            onClick={handleRegister}
            style={{ width: "60%" }}
          >
            <b>Register</b>
          </Button>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default Register;
