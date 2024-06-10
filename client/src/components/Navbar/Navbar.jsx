import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import styles from "./Navbar.module.css";
import logo from '../../images/NM.png';

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const userProfilePic = JSON.parse(localStorage.getItem("userInfo"))?.pic;
  const [openDialog, setOpenDialog] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfileMenu = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
  const LogoutUser = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box sx={{ position: "fixed", width: "100%", zIndex: 10000 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <img src={logo} alt="logo" style={{ width: '70px', padding: '10px', paddingBottom: '0px' }} />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                aria-controls={openProfileMenu ? "account-menu" : undefined}
                aria-expanded={openProfileMenu ? "true" : undefined}
                color="black"
                onClick={handleProfileClick}
              >
                <Avatar alt="Profile" src={userProfilePic} />
              </IconButton>
            </Box>
          </Toolbar>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openProfileMenu}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.8,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Link to="/profile" className={styles.menuItemProfile}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                <Box>Profile</Box>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClickOpenDialog}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure of logout?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Disagree</Button>
              <Button onClick={LogoutUser} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
