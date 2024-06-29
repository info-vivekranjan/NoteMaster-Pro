import {
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./ShowMarkdownFile.module.scss";
import { Link } from "react-router-dom";

const ShowSingleTextEditor = (props) => {
  const { item, handleDeleteMarkdownEditor } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  // Helper function to truncate text to 150 words
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  let contentData = isExpanded
  ? item?.content
  : truncateText(item?.content, 18)

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
          <Box sx={{ mb: "15px" }}>
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
          <Box sx={{ width: "100%" }}>
            <TextField
              id="markdowntext-basic"
              label="Preview Markdown"
              variant="outlined"
              type="text"
              name="markdowntext-basic"
              value={contentData}
              multiline
              disabled
              rows={10}
              style={{
                width: "100%",
                backgroundColor: "#f2f2f2",
                color: "#000000",
              }}
            />
          </Box>
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
          <Link
            to={`/edit-markdown-editor/${item._id}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              size="small"
              endIcon={<EditIcon />}
              sx={{ mr: "15px" }}
            >
              Edit
            </Button>
          </Link>
          <Button
            variant="contained"
            size="small"
            endIcon={<DeleteIcon />}
            onClick={() => handleDeleteMarkdownEditor(item?._id)}
          >
            Delete
          </Button>
        </Box>
      </Accordion>
    </Box>
  );
};

export default ShowSingleTextEditor;
