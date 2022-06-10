import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes } from "../../redux/notes/notesAction";
const NotesData = () => {
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.notesData);

  useEffect(() => {
    dispatch(getAllNotes());
  }, []);

  console.log(notesData);
  return (
    <Box>
      <Typography> NotesData</Typography>
    </Box>
  );
};

export default NotesData;
