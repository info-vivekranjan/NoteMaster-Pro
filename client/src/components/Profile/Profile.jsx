import React from 'react'
import Navbar from "../Navbar/Navbar";
import { Box } from '@mui/material';

const Profile = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Box sx={{ pt: "100px" }}>
        <div>Profile</div>
      </Box>
    </React.Fragment>
  )
}

export default Profile