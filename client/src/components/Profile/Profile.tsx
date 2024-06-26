import React from "react";
import Navbar from "../Navbar/Navbar";
import { Box, Paper, Typography } from "@mui/material";

const Profile = () => {
  const userProfile = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <React.Fragment>
      <Navbar />
      <Box sx={{ pt: "100px" }}>
        <Box sx={{ mb: "50px" }}>
          <Paper elevation={3} sx={{ width: '40%', m: 'auto', p: '30px', textAlign: 'center', mt: '15vh' }}>
            <Typography variant="h4"> Profile</Typography>
            <img
              alt="Profile"
              src={userProfile?.pic}
              style={{
                width: "30%",
                border: "2px solid black",
                borderRadius: "50%",
              }}
            />
            <Typography variant="h6">Name : {userProfile?.name}</Typography>
            <Typography variant="h6">Email : {userProfile?.email}</Typography>
          </Paper>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Profile;
