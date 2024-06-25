import {
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReactToPrint from "react-to-print";
import DownloadIcon from "@mui/icons-material/Download";
import InfoIcon from "@mui/icons-material/Info";
import styles from "./ShowTextEditor.module.scss";

const ShowSingleTextEditor = (props) => {
  const { item, handleDeleteTextEditor } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = React.useRef(null);
  // Helper function to truncate text to 150 words
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <Box key={item._id}>
      <Accordion
        style={{
          marginBottom: "15px",
          padding: "5px",
          backgroundColor: "#fffad0",
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: "7px" }}>
            <Chip
              label={
                <b
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {item.category}
                </b>
              }
              color="success"
              size="small"
            />
          </Box>
          <Typography
            ref={inputRef}
            dangerouslySetInnerHTML={{
              __html: isExpanded
                ? item?.content
                : truncateText(item?.content, 150),
            }}
          />
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ mt: "15px" }}
          >
            -- Created on : {item.createdAt.substring(0, 10)}
          </Typography>
          <Box className={styles.viewMoreLessCont}>
            <Typography
              variant="subtitle2"
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.viewMoreLess}
            >
              {isExpanded ? "View Less" : "View More"}
            </Typography>
          </Box>
          <ReactToPrint
            trigger={() => (
              <Button disabled={!isExpanded} variant="contained" endIcon={<DownloadIcon />}>
                Download Pdf
              </Button>
            )}
            content={() => inputRef.current}
          />
          <Tooltip title="Info: Click on View More then Download the Pdf." placement="top-start">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </AccordionDetails>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            ml: "15px",
            pt: "10px",
          }}
        >
          <Button
            variant="contained"
            size="small"
            endIcon={<EditIcon />}
            sx={{ mr: "15px" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            endIcon={<DeleteIcon />}
            onClick={() => handleDeleteTextEditor(item?._id)}
          >
            Delete
          </Button>
        </Box>
      </Accordion>
    </Box>
  );
};

export default ShowSingleTextEditor;
